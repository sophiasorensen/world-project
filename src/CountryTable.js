import "./App.css";
import React from 'react';
import {useQuery} from "@apollo/client";
import { queryCountries } from "./queries"

export const CountryTable = () => {
    const {data, loading, error} = useQuery(queryCountries);

    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }

    return (
        <table>
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