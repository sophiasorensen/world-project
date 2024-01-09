import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useState } from "react";
import CountryInfo from "./CountryInfo";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams(createSearchParams());

    return (
        <div>
            <Navbar searchParams={ searchParams } setSearchParams={ setSearchParams } />
            <CountryTable searchParams={ searchParams } setSearchParams={ setSearchParams } />
            <CountryInfo searchParams={ searchParams } setSearchParams={ setSearchParams } />
        </div>
    );
}
