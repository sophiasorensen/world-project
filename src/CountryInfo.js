import * as React from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, DialogBody, Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import "./App.css";

function CountryDataRow({header, data}) {
    return (
        <tr>
            <th>{header}:</th>
            <td>{data}</td>
        </tr>
    );
}

export default function CountryInfo({ searchParams, updateSearchParams }) {
    let country = searchParams.get('country');

    const variables = { code: country };
    const { data, loading, error } = useQuery(queryCountry, { variables });
    function handleClose() {
        updateSearchParams({ 'country': null });
    }

    return (
        <Dialog isOpen={ !!country } onClose={ handleClose } className="dialog-window">
            <DialogBody>
                { error && <ErrorPage error={ error } /> }
                { loading && <Spinner className="dialog-window"/> }
                { !error && !loading &&
                    <table className="bp5-html-table bp5-compact">
                        <thead>
                            <tr>
                                <th>
                                    { data.country.emoji }<span className="tab">{ data.country.name }</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <CountryDataRow header="Capital" data={ data.country.capital } />
                            <CountryDataRow header="Currency" data={ data.country.currency } />
                            <CountryDataRow header="Languages" data={ data.country.languages.map((language) => language.name).join(", ") } />
                        </tbody>
                    </table> }
            </DialogBody>
        </Dialog>
    );
}