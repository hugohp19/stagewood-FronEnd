import { gql } from '@apollo/client';

export const Login_Mutation = gql `
mutation login($email:String!, $password: String!){
  login(email: $email, password: $password) {
    token
    user{
      name
      username
      email
      picture
    }
  }
}
`

export const SignUp_Mutation = gql`
mutation signup($name: String!, $username: String!, $email: String!, $password: String!, $picture: String!){
  signup(name: $name, username: $username, email: $email, password: $password, picture: $picture) {
    token
    user {
      id
      name
      email
      password
      username
      picture
    }
  }
}
`
