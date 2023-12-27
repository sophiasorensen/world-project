import { gql } from '@apollo/client';

export const queryCountries = gql`
  {
    countries {
      name
      code
      capital
      emoji
    }
  }
`;