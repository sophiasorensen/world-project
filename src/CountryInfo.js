import React from "react";
import { observer } from "mobx-react";
import CountryUserCommentBox from "./CountryUserCommentBox";
import { Card } from "@blueprintjs/core";

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
    }

    render() {
        let {
            data,
            countryCode,
            searchParams,
            updateSearchParams,
            localData,
            getLocalData,
            setLocalData,
        } = this.props;

        return (
            <Card>
                <table className="bp5-html-table bp5-compact">
                    <tbody>
                    <CountryDataRow header="Continent" data={ data?.country.continent.name } />
                    <CountryDataRow header="Capital" data={ data?.country.capital } />
                    <CountryDataRow header="Currency" data={ data?.country.currency } />
                    <CountryDataRow header="Languages" data={ data?.country.languages.map((language) => language.name).join(", ") } />
                    </tbody>
                </table>
                <CountryUserCommentBox countryCode={ countryCode }
                                       searchParams={ searchParams }
                                       updateSearchParams={ updateSearchParams }
                                       localData={ localData }
                                       getLocalData={ getLocalData}
                                       setLocalData={ setLocalData }
                />
            </Card>
        );
    }
})

export default CountryInfo;