import "./App.css";
import React from 'react';
import { useQuery } from "@apollo/client";
import { queryCountries } from "./queries";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Footer from "./Footer";

const CountryRow = ({ setDialogOpen, setCurrentCountryCode, country }) => {
    function handleClick() {
        setDialogOpen(true)
        setCurrentCountryCode(country.code)
    }

    return (
        <tr value={ country.code } onClick={ handleClick }>
            <td>{ country.emoji }</td>
            <td>{ country.name }</td>
            <td>{ country.capital }</td>
        </tr>
    );
}
export const CountryTable = ({ currentNavbarId, setDialogOpen, setCurrentCountryCode }) => {
    const variables = { filter : currentNavbarId !== "WO" ? { continent:  { eq: currentNavbarId } } : { } }

    const { data, loading, error } = useQuery(queryCountries, { variables });

    if (loading) {
        return <LoadingPage/>
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
                                setDialogOpen={ setDialogOpen }
                                setCurrentCountryCode={ setCurrentCountryCode }
                                country={ country }
                                />) }
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}