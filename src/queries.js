import { gql } from '@apollo/client';

export const queryCountries = gql`
  query CountriesQuery($filter: CountryFilterInput!){
    countries(filter: $filter) {
      name
      code
      capital
      emoji
    }
  }
`;

export const queryCountry=gql`
    query CountryQuery($filter: CountryFilterInput!) {
        country(filter: $filter) {
            name
            native
            capital
            emoji
            currency
            languages {
              code
              name
            }
        }
    }
`;