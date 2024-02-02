import React from "react";
import { observer } from "mobx-react";
import { action, makeObservable, observable } from "mobx";
import { countryKey } from "./common";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import CountryUserCommentBox from "./CountryUserCommentBox";
import { DialogBody } from "@blueprintjs/core";

function CountryDataRow({header, data}) {
    return (
        <tr>
            <th>{header}:</th>
            <td>{data}</td>
        </tr>
    );
}
const CountryInfo = observer( class CountryInfo extends React.Component {

    constructor(props) {
        super(props);

        makeObservable(this, {
        })
    }

    render() {
        let {
            data,
            searchParams,
            updateSearchParams
        } = this.props;

        return (
            <DialogBody>
                <table className="bp5-html-table bp5-compact">
                    <tbody>
                    <CountryDataRow header="Continent" data={ data?.country.continent.name } />
                    <CountryDataRow header="Capital" data={ data?.country.capital } />
                    <CountryDataRow header="Currency" data={ data?.country.currency } />
                    <CountryDataRow header="Languages" data={ data?.country.languages.map((language) => language.name).join(", ") } />
                    </tbody>
                </table>
                <CountryUserCommentBox searchParams={ searchParams } updateSearchParams={ updateSearchParams }/>
            </DialogBody>
        );
    }
})

export default CountryInfo;