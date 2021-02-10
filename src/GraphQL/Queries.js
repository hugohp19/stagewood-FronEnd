import gql from 'graphql-tag';

export const GetUsers = gql`
  query{
    feed{
      name, id, email
    }
}
`