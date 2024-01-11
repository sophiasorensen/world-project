import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams(createSearchParams());

    useEffect(() => console.log('UseEffect: dialogOpen has changed: ' + !!searchParams.get('country')))

    function updateSearchParams(params) {
        let newParams = {};
        searchParams.forEach((key, value) => {
            if (params[key] != null) newParams[value] = key;
        });

        for (const [key,value] of Object.entries(params)) {
            if (value != null) newParams[key] = value;
        }
        setSearchParams(createSearchParams(newParams));
    }

    return (
        <div>
            <Navbar searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
            <CountryTable searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
            <CountryInfo searchParams={ searchParams } updateSearchParams={ updateSearchParams } />
        </div>
    );
}
