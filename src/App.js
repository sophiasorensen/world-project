import "./App.css";
import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import React, {useState} from "react";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});

function App() {
    let [currentNavbarId, setCurrentNavbarId] = useState("wo")

    return (
        <div className="global-margin">
            <ApolloProvider client={client}>
                <Navbar currentNavbarId={currentNavbarId} setCurrentNavBarId={setCurrentNavbarId} />
                <CountryTable />
            </ApolloProvider>
        </div>
    );
}

export default App;
