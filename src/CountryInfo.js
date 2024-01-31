import * as React from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { DialogBody, Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import "./App.css";
import CountryUserCommentBox from "./CountryUserCommentBox";
import { countryKey } from "./common";

function CountryDataRow({header, data}) {
    return (
        <tr>
            <th>{header}:</th>
            <td>{data}</td>
        </tr>
    );
}

export default function CountryInfo({ searchParams, updateSearchParams }) {
    const country = searchParams.get(countryKey);
    const dialogEnabled = !!country;
    const variables = dialogEnabled ? { code: country } : {};
    const { data, loading, error } = useQuery(queryCountry, { variables, skip: !dialogEnabled });

    return (
        <DialogBody>
            { error && <ErrorPage error={ error } /> }
            { loading && <Spinner className="dialog-window"/> }
            { !error && !loading &&
                <table className="bp5-html-table bp5-compact">
                    <thead>
                        <tr>
                            <th>
                                { data?.country.emoji }<span className="tab">{ data?.country.name }</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <CountryDataRow header="Continent" data={ data?.country.continent.name } />
                        <CountryDataRow header="Capital" data={ data?.country.capital } />
                        <CountryDataRow header="Currency" data={ data?.country.currency } />
                        <CountryDataRow header="Languages" data={ data?.country.languages.map((language) => language.name).join(", ") } />
                    </tbody>
                </table> }
            <CountryUserCommentBox searchParams={ searchParams } updateSearchParams={ updateSearchParams }/>
        </DialogBody>
    );
}