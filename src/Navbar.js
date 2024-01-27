import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import "./App.css";
import SearchBar from "./SearchBar";

export const Navbar = ({ searchParams, updateSearchParams }) => {
    function setContinent(code) {
        updateSearchParams({ continent: code !== "WO" ? code : null });
    }

    return (
        <div className="spacing-margin">
            <Tabs id="continent" selectedTabId={ searchParams } onChange={ setContinent }>
                <Tab id="WO" title="World" />
                <Tab id="AF" title="Africa" />
                <Tab id="AS" title="Asia" />
                <Tab id="EU" title="Europe" />
                <Tab id="NA" title="North America" />
                <Tab id="OC" title="Oceania" />
                <Tab id="SA" title="South America" />
                <TabsExpander />
                <SearchBar searchParams={ searchParams } updateSearchParams={ updateSearchParams }/>
            </Tabs>
        </div>
    );
}