import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import { Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";


const CountryRow = ({ updateSearchParams, country }) => {
    function handleClick()  {
        updateSearchParams({ country: country.code })
    }

    return (
        <tr value={ country.code } onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
        </tr>
    );
}
export const CountryTable = ({ searchParams, updateSearchParams }) => {
    let currentContinent = searchParams.get('continent') || "WO"
    let searchQuery = searchParams.get('searchQuery')
    console.log(searchQuery)
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
                                updateSearchParams={ updateSearchParams }
                                country={ country }
                                />) }
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}