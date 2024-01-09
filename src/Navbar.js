import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import "./App.css";

export const Navbar = ({ searchParams, setSearchParams }) => {
    function setContinent(code) {
        let continent = code || "WO"
        setSearchParams({ ...searchParams, continent })
    }

    return (
        <div className="spacing-margin">
            <Tabs id="Countries" selectedTabId={ searchParams } onChange={ setContinent }>
                <Tab id="WO" title="World" />
                <Tab id="AF" title="Africa" />
                <Tab id="AS" title="Asia" />
                <Tab id="EU" title="Europe" />
                <Tab id="NA" title="North America" />
                <Tab id="OC" title="Oceania" />
                <Tab id="SA" title="South America" />
                <TabsExpander />
                <input className="bp5-input" type="text" placeholder="Search..." />
            </Tabs>
        </div>
    );
}