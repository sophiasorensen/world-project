import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from "react";
import Page from "./Page";
import Header from "./Header";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});

function App() {

    return (
        <div className="global-margin">
            <ApolloProvider client={ client }>
                <Header/>
                <Page/>
            </ApolloProvider>
        </div>
    );
}

export default App;
