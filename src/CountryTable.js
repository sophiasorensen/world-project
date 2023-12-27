import "./App.css";
import React from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      emojiU
    }
  }
`;

export const CountryTable = () => {
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }
    console.log(data)
    return (
        <table>
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Country</th>
                    <th>Capital</th>
                </tr>
            </thead>
            <tbody>
            {data.countries.map(function(country) {
                return (
                    <tr key={country.code} value={country.code}>
                        <td>{country.emojiU}</td>
                        <td>{country.name}</td>
                        <td>{country.capital}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}