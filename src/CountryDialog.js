import * as React from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, DialogBody, Spinner, Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import ErrorPage from "./ErrorPage";
import "./App.css";
import { countryKey } from "./common";
import CountryInfo from "./CountryInfo";
import CountryContacts from "./CountryContacts";
import { observer } from "mobx-react";

const dialogTabsParamKey = "countryTab";
const infoId = "Info";
const contactsId = "Contacts";

const CountryDialog = observer(({ searchParams, updateSearchParams, getLocalData, setLocalData, addContact, updateContact, deleteContact }) => {
    const countryCode = searchParams.get(countryKey);

    const dialogEnabled = !!countryCode;

    const localCountry = dialogEnabled ? getLocalData(countryCode) : null;

    const variables = dialogEnabled ? { code: countryCode } : {};
    const { data, loading, error } = useQuery(queryCountry, { variables, skip: !dialogEnabled });

    let currentTab = searchParams.get(dialogTabsParamKey) ?? infoId;
    let countryName = data ? `${ data.country.emoji } ${ data.country.name }` : null

    function handleClose() {
        updateSearchParams({ country: null, countryTab: null, editingContact: null });
    }

    function setCountryTab(newTabId) {
        updateSearchParams({ countryTab: newTabId });
        currentTab = searchParams.get(dialogTabsParamKey);
    }

    const contactsPanel = (
        <CountryContacts countryCode={ countryCode }
                         localCountry={ localCountry }
                         searchParams={ searchParams }
                         updateSearchParams={ updateSearchParams }
                         setLocalData={ setLocalData }
                         addContact={ addContact }
                         updateContact={ updateContact }
                         deleteContact={ deleteContact }
                         />
    );

    const infoPanel = (
        <CountryInfo country={ data?.country }
                     countryCode={ countryCode }
                     localCountry={ localCountry }
                     searchParams={ searchParams }
                     updateSearchParams={ updateSearchParams }
                     setLocalData={ setLocalData }
                     />
    );

    return (
        <Dialog isOpen={ dialogEnabled } onClose={ handleClose } className="dialog-window" title={ countryName } >
            <DialogBody>
                { error && <ErrorPage error={ error } /> }
                { loading && <Spinner className="dialog-window"/> }
                { !error && !loading &&
                    <Tabs className="tab" id={ dialogTabsParamKey } selectedTabId={ currentTab } onChange={ setCountryTab } >
                        <Tab id={ infoId }     title="Info"     panel={ infoPanel }/>
                        <Tab id={ contactsId } title="Contacts" panel={ contactsPanel }/>
                        <TabsExpander />
                    </Tabs>
                }
            </DialogBody>
        </Dialog>
    );
});

export default CountryDialog