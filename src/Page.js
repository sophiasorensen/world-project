import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useState } from "react";
import CountryInfo from "./CountryInfo";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams(createSearchParams());

    function updateSearchParams(params) {
        let newParams = {};
        searchParams.forEach((key, value) => {
            newParams[value] = key
        });

        for (const [key,value] of Object.entries(params)) {
            newParams[key] = value
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
