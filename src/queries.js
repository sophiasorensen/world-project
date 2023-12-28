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