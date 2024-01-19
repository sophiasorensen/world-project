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
    query CountryQuery($code: ID!) {
        country(code: $code) {
            name
            continent {
                name
            }
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