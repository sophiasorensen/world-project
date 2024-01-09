import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import { Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";

const CountryRow = ({ searchParams, setSearchParams, country }) => {
    function handleClick()  {
        let continent = searchParams.get('continent') || "WO"
        let dialog = true
        let countryCode = country.code
        setSearchParams({ ...searchParams, continent, dialog, countryCode })
    }

    return (
        <tr value={ country.code } onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
        </tr>
    );
}
export const CountryTable = ({ searchParams, setSearchParams }) => {
    let currentContinent = searchParams.get('continent') || "WO"
    let variables= { filter : currentContinent !== "WO" ? { continent:  { eq: currentContinent } } : { } }

    const { data, loading, error } = useQuery(queryCountries, { variables });

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <ErrorPage error={ error }/>
    }

    return (
        <div>
            <table className="bp5-html-table bp5-compact bp5-html-table-bordered bp5-html-table-striped bp5-interactive countries-table spacing-margin">
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Country</th>
                        <th>Capital</th>
                    </tr>
                </thead>
                <tbody>
                { data.countries.map((country) =>
                    <CountryRow key={ country.code }
                                searchParams={ searchParams }
                                setSearchParams={ setSearchParams }
                                country={ country }
                                />) }
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}