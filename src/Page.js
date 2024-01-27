import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React from "react";
import CountryInfo from "./CountryInfo";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Header from "./Header";

export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams(createSearchParams());

    function updateSearchParams(params) {
        let newParams = {};
        searchParams.forEach((value, key) => {
            if (params[key] !== null) newParams[key] = value;
        });

        for (const [key,value] of Object.entries(params)) {
            if (value !== null) newParams[key] = value;
        }
        setSearchParams(createSearchParams(newParams));
    }

    return (
        <div>
            <Header updateSearchParams={ updateSearchParams } />
            <Navbar searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
            <CountryTable searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
            <CountryInfo searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
        </div>
    );
}
