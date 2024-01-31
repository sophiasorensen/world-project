import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Dialog, Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { countryKey } from "./common";
import "./App.css";
import CountryInfo from "./CountryInfo";
import CountryContacts from "./CountryContacts";

const CountryDirectory = observer(class CountryDirectory extends React.Component{
    currentTab = "Info";

    constructor(props) {
        super(props);

        makeObservable(this, {
            currentTab:observable,

            handleClose:action.bound,
            setTab: action.bound,
        })
    }

    handleClose() {
        this.props.updateSearchParams({ country: null });
    }

    setTab(newTab) {
        this.currentTab = newTab;
    }

    render() {
        let dialogEnabled = !!this.props.searchParams.get(countryKey);
        let { searchParams, updatedSearchParams } = this.props
        let {
            currentTab,
            handleClose,
            setTab
        } = this;

        return (
            <Dialog isOpen={ dialogEnabled } onClose={ handleClose } className="dialog-window">
                <Tabs className="tab" selectedTabId={ searchParams } onChange={ setTab }>
                    <Tab id="Info" title="Info" />
                    <Tab id="Contacts" title="Contacts" />
                </Tabs>
                <TabsExpander />
                {currentTab === "Info" && <CountryInfo searchParams={ searchParams } updateSearchParams={ updatedSearchParams } />}
                {currentTab === "Contacts" && <CountryContacts />}
            </Dialog>
        );
    }
})

export default CountryDirectory;