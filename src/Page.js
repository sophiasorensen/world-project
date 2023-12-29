import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

export default function Page() {
    let [currentNavbarId, setCurrentNavbarId] = useState("WO")
    let [currentCountryCode, setCurrentCountryCode] = useState("")

    return (
        <div>
            <Navbar currentNavbarId={ currentNavbarId } setCurrentNavbarId={ setCurrentNavbarId } />
            <CountryTable currentNavbarId={ currentNavbarId } setCurrentCountryCode={ setCurrentCountryCode } />
            <CountryInfo currentCountryCode={ currentCountryCode} setCurrentCountryCode={ setCurrentCountryCode } />
        </div>
    );
}
