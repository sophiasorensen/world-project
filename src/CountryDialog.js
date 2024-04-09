import * as React from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, DialogBody, Spinner, Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import "./App.css";
import { countryKey } from "./common";
import CountryInfo from "./CountryInfo";
import CountryContacts from "./CountryContacts";

export default function CountryDialog({ searchParams, updateSearchParams, localData, getLocalData, setLocalData, addContact, updateContact, deleteContact }) {
    const country = searchParams.get(countryKey);
    const dialogEnabled = !!country;
    const variables = dialogEnabled ? { code: country } : {};
    const { data, loading, error } = useQuery(queryCountry, { variables, skip: !dialogEnabled });
    let currentTab = searchParams.get("countryTab") ?? "Info";
    let countryInfo = ( <CountryInfo data={ data }
                                    countryCode={ country }
                                    searchParams={ searchParams }
                                    updateSearchParams={ updateSearchParams }
                                    localData={ localData }
                                    getLocalData={ getLocalData }
                                    setLocalData={ setLocalData }
    /> );
    let countryContacts = ( <CountryContacts countryCode={ country }
                                             searchParams={ searchParams }
                                             updateSearchParams={ updateSearchParams }
                                             localData={ localData }
                                             getLocalData={ getLocalData }
                                             setLocalData={ setLocalData }
                                             addContact={ addContact }
                                             updateContact={ updateContact }
                                             deleteContact={ deleteContact }
    /> );
    let countryName = data ? data?.country.emoji + " " + data?.country.name : null

    function handleClose() {
        updateSearchParams({ country: null, countryTab: null, editingContact: null });
    }

    function setCountryTab(newTabId) {
        updateSearchParams({ countryTab: newTabId });
        currentTab = searchParams.get("countryTab");
    }

    return (
        <Dialog isOpen={ dialogEnabled } onClose={ handleClose } className="dialog-window" title={ countryName } >
            <DialogBody>
                { error && <ErrorPage error={ error } /> }
                { loading && <Spinner className="dialog-window"/> }
                { !error && !loading &&
                    <Tabs className="tab" id="countryTab" selectedTabId={ currentTab } onChange={ setCountryTab } >
                        <Tab id="Info" title="Info" panel={ countryInfo }/>
                        <Tab id="Contacts" title="Contacts" panel={ countryContacts }/>
                        <TabsExpander />
                    </Tabs>
                }
            </DialogBody>
        </Dialog>
    );
}