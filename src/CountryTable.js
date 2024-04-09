import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import { Spinner } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import { continentKey, worldCode } from "./common";

const CountryRow = ({ updateSearchParams, localUrl, country }) => {
    function handleClick()  {
        updateSearchParams({ country: country.code })
    }

    return (
        <tr onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
            <td>{ localUrl && <a href={ localUrl }>{ localUrl }</a> }</td>
        </tr>
    );
}

export const CountryTable = ({ searchParams, updateSearchParams, getLocalData }) => {
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
                { data.countries.map((country) => {
                    let localUrl = getLocalData(country.code)?.url

                    return <CountryRow key={ country.code }
                                       updateSearchParams={ updateSearchParams }
                                       localUrl={ localUrl }
                                       country={ country }
                                       />
                    })}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}