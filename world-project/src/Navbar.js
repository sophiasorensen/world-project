import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import {useState} from "react";

export const Navbar = () => {
    let [currentNavbarId, setCurrentNavbarId] = useState("wo")

    return (
        <Tabs id="Countries" onChange={setCurrentNavbarId} selectedTabId={currentNavbarId}>
            <Tab id="wo" title="🌎 World" />
            <Tab id="afr" title="Africa" />
            <Tab id="as" title="Asia" />
            <Tab id="eur" title="Europe" />
            <Tab id="na" title="North America" />
            <Tab id="oc" title="Oceania" />
            <Tab id="sa" title="South America" />
            <TabsExpander />
            <input className="bp5-input" type="text" placeholder="Search..." />
        </Tabs>
    );
}