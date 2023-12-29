import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const CountryRow = ({ setCurrentCountryCode, country }) => {
    function handleClick() {
        setCurrentCountryCode(country.code)
    }

    return (
        <tr key={ country.code } value={ country.code } onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
        </tr>
    );
}
export const CountryTable = ({ currentNavbarId, setCurrentCountryCode }) => {
    const variables = { filter : currentNavbarId !== "WO" ? { continent:  { eq: currentNavbarId } } : { } }

    const { data, loading, error } = useQuery(queryCountries, { variables });

    if (loading) {
        return <LoadingPage/>
    }

    if (error) {
        return <ErrorPage error={ error }/>
    }

    return (
        <table className="bp5-html-table bp5-compact bp5-html-table-bordered bp5-html-table-striped bp5-interactive">
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Country</th>
                    <th>Capital</th>
                </tr>
            </thead>
            <tbody>
            { data.countries.map((country) => <CountryRow setCurrentCountryCode={ setCurrentCountryCode } country={ country }/>) }
            </tbody>
        </table>
    );
}