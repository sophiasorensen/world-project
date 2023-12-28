import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import React, { useState } from "react";

export default function Page() {
    let [currentNavbarId, setCurrentNavbarId] = useState("WO")

    return (
        <div>
            <Navbar currentNavbarId={ currentNavbarId } setCurrentNavbarId={ setCurrentNavbarId } />
            <CountryTable currentNavbarId={ currentNavbarId } />
        </div>
    );
}
