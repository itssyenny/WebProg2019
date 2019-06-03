import { gql } from 'apollo-boost'

export const USERS_SUBSCRIPTION = gql`
  subscription {
    user {
      mutation
      data {
        id
        name
        posts {
            id
            title
          }
      }
    }
  }
`
