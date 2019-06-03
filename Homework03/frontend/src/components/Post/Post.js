import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Comment from '../../components/Post/Comment'
import { POSTS_QUERY } from '../../graphql'
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap'

class Post extends Component {
  handleComment(index) {
    this.props.handleComment(index)
  }
  render() {
    var id = this.props.data.id
    var title = this.props.data.title
    var body = this.props.data.body
    var published = this.props.data.published
    var name = this.props.data.author.name

    return (
      <Card style={{ margin: '30px auto', width: '400px' }}>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          {body || <p style={{ opacity: 0.5 }}>No body for this post...</p>}
        </CardBody>
        <CardFooter>{`${name} - published: ${published}`}</CardFooter>
         <Query query={POSTS_QUERY}>
         {({ loading, error, data, subscribeToMore }) => {
            const count = data.comments.filter(comment => comment.post.id === id).length
            return <Button color="link" onClick={this.props.handleComment.bind(this, id)}>{`${count} comments`}</Button>
          }}
         </Query>   
        
        <div style={{display: (this.props.commentHandle === id && this.props.commentHandleBoolean === true) ? "block": "none"}}>
            <Query query={POSTS_QUERY}>
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <p>Loading in posts in userLists</p>
              if (error) return <p>Error in posts in userLists</p>

              const filtercomments = data.comments.filter( comment => comment.post.id === id)
              const comments = filtercomments.map((comment, id) => (
                  <Comment data={comment} key={id}/>
              ))

              return <div>{comments}</div>
            }}
          </Query>
          </div>
      </Card>
    )
  }
}

export default Post
