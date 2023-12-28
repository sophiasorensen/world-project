import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

export const CountryTable = ({currentNavbarId}) => {
    const variables = { filter : currentNavbarId !== "WO" ? { continent:  { eq: currentNavbarId } } : { } }

    const {data, loading, error} = useQuery(queryCountries, { variables });

    if (loading) {
        return <LoadingPage/>
    }

    if (error) {
        return <ErrorPage error={error}/>
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
            {data.countries.map((country) => {
                return (
                    <tr key={country.code} value={country.code}>
                        <td>{country.emoji}</td>
                        <td>{country.name}</td>
                        <td>{country.capital}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}