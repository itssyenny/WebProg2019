import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query {
     users {
      id
      name
      posts {
        id
        title
      }
    },
    posts {
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
    },
    comments {
      text
      author {
        name
      }
      post {
        id
      }
    }
  }
`
