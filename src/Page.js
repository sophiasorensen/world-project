import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

export default function Page() {
    let [ currentNavbarId, setCurrentNavbarId ] = useState("WO");
    let [currentCountryCode, setCurrentCountryCode ] = useState("US");
    let [ dialogOpen, setDialogOpen ] = useState(false);

    return (
        <div>
            <Navbar currentNavbarId={ currentNavbarId } setCurrentNavbarId={ setCurrentNavbarId } />
            <CountryTable currentNavbarId={ currentNavbarId } setDialogOpen={ setDialogOpen } setCurrentCountryCode={ setCurrentCountryCode } />
            <CountryInfo dialogOpen={ dialogOpen } setDialogOpen={ setDialogOpen } currentCountryCode={ currentCountryCode } />
        </div>
    );
}
