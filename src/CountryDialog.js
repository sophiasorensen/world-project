import * as React from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, Spinner, Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import "./App.css";
import { countryKey } from "./common";
import CountryInfo from "./CountryInfo";
import CountryContacts from "./CountryContacts";

export default function CountryDialog({ searchParams, updateSearchParams }) {
    const country = searchParams.get(countryKey);
    const dialogEnabled = !!country;
    const variables = dialogEnabled ? { code: country } : {};
    const { data, loading, error } = useQuery(queryCountry, { variables, skip: !dialogEnabled });
    let currentTab = searchParams.get("countryTab") ?? "Info";

    function handleClose() {
        updateSearchParams({ country: null, countryTab: null, editingContact: null });
    }

    function setCountryTab(newTabId) {
        updateSearchParams({ countryTab: newTabId });
        currentTab = searchParams.get("countryTab");
    }

    function getCountryName() {
        return data ? data?.country.emoji + " " + data?.country.name : null;
    }

    return (
        <Dialog isOpen={ dialogEnabled } onClose={ handleClose } className="dialog-window" title={ getCountryName() } >
            { error && <ErrorPage error={ error } /> }
            { loading && <Spinner className="dialog-window"/> }
            { !error && !loading &&
                <Tabs className="tab" id="countryTab" selectedTabId={ currentTab } onChange={ setCountryTab } >
                    <Tab id="Info" title="Info" panel={<CountryInfo data={ data } countryCode={ country } searchParams={ searchParams } updateSearchParams={ updateSearchParams } />}/>
                    <Tab id="Contacts" title="Contacts" panel={<CountryContacts countryCode={ country } searchParams={ searchParams } updateSearchParams={ updateSearchParams } />} />
                    <TabsExpander />
                </Tabs>
            }
        </Dialog>
    );
}