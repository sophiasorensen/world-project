import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";

export const Navbar = ({ currentNavbarId, setCurrentNavbarId }) => {
    return (
        <Tabs id="Countries" selectedTabId={ currentNavbarId } onChange={ setCurrentNavbarId }>
            <Tab id="WO" title="🌎 World" />
            <Tab id="AF" title="Africa" />
            <Tab id="AS" title="Asia" />
            <Tab id="EU" title="Europe" />
            <Tab id="NA" title="North America" />
            <Tab id="OC" title="Oceania" />
            <Tab id="SA" title="South America" />
            <TabsExpander />
            <input className="bp5-input" type="text" placeholder="Search..." />
        </Tabs>
    );
}