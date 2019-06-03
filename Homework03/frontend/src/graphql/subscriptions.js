import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        id
        title
        body
        author {
          id
          name
        }
        published
        comments {
          id
          text
        }
        commentsCount
      }
    }
  }
`
