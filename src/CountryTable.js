import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import { Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import { continentKey, worldCode } from "./common";

const CountryRow = ({ updateSearchParams, localData, country }) => {
    let localURL = localData[country.code] ? localData[country.code].url : ""
    function handleClick()  {
        updateSearchParams({ country: country.code })
    }

    function createClickableURL() {
        if (localURL) {
            return (<a href={localURL}>{ localURL }</a>)
        }
    }

    return (
        <tr value={ country.code } onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
            <td>{ createClickableURL() }</td>
        </tr>
    );
}
export const CountryTable = ({ searchParams, updateSearchParams, localData, getLocalData }) => {
    let currentContinent = searchParams.get(continentKey) || worldCode;
    let q = searchParams.get('q') || "";
    let qCap = q.charAt(0).toUpperCase() + q.slice(1);

    let variables= { filter : { name: { regex: `^.*${q}|${qCap}.*$`} } }
    if (currentContinent !== worldCode)
        variables.filter.continent = { eq: currentContinent }

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
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                { data.countries.map((country) =>
                    getLocalData(country.code) &&
                    <CountryRow key={ country.code }
                                updateSearchParams={ updateSearchParams }
                                localData={ localData }
                                country={ country }
                                />) }
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}