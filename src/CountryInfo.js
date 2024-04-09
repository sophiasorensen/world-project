import React from "react";
import { observer } from "mobx-react";
import CountryUserCommentBox from "./CountryUserCommentBox";
import { Card } from "@blueprintjs/core";

function CountryDataRow({ header, data }) {
    return (
        <tr>
            <th>{ header }:</th>
            <td>{ data }</td>
        </tr>
    );
}

class CountryInfo extends React.Component {
    render() {
        let {
            country,
            countryCode,
            localCountry,
            searchParams,
            updateSearchParams,
            setLocalData,
        } = this.props;

        return (
            <Card>
                <table className="bp5-html-table bp5-compact info-margin">
                    <tbody>
                    <CountryDataRow header="Continent" data={ country?.continent.name } />
                    <CountryDataRow header="Capital"   data={ country?.capital } />
                    <CountryDataRow header="Currency"  data={ country?.currency } />
                    <CountryDataRow header="Languages" data={ country?.languages.map((language) => language.name).join(", ") } />
                    </tbody>
                </table>
                <CountryUserCommentBox countryCode={ countryCode }
                                       localCountry={ localCountry }
                                       searchParams={ searchParams }
                                       updateSearchParams={ updateSearchParams }
                                       setLocalData={ setLocalData }
                                       />
            </Card>
        );
    }
}

export default CountryInfo;