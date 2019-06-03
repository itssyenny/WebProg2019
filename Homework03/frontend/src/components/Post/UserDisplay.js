import React, { Component } from 'react'
import { Card, CardBody, Button } from 'reactstrap'
import { Query } from 'react-apollo'
import Post from '../../components/Post/Post'
import {
  POSTS_QUERY,
  POSTS_SUBSCRIPTION
} from '../../graphql'

let unsubscribe = null

class UserDisplay extends Component {
	handleList() {
		this.props.handleList()
	}

	handleComment() {
		this.props.handleComment()
	}
	render() {
		var currentId = this.props.data.id
		var currentName = this.props.data.name
		return (
			<div>
				<br />
				<Query query={POSTS_QUERY}>
					{({ loading, error, data, subscribeToMore }) => {
						const count = data.posts.filter(post => post.author.id === currentId).length
						return <Button color="primary" style={{ marginBottom: '1rem', width: '550px' }} onClick={this.props.handleList.bind(this, currentId)}>{`${currentName} has ${count} posts`}</Button>
					}}
				</Query>   
					<Card style={{display: (this.props.openList === currentId && this.props.openListBoolean === true) ? "block": "none"}}>
						<CardBody>
								<Query query={POSTS_QUERY}>
									{({ loading, error, data, subscribeToMore }) => {
										if (loading) return <p>Loading in posts in userLists</p>
										if (error) return <p>Error in posts in userLists</p>

										const filterposts = data.posts.filter( post => post.author.id === currentId)
										const posts = filterposts.map((post, id) => (
											<Post data={post} key={id} handleComment={this.props.handleComment} commentHandle={this.props.commentHandle} commentHandleBoolean={this.props.commentHandleBoolean} />	
										))
										if (!unsubscribe)
											unsubscribe = subscribeToMore({
												document: POSTS_SUBSCRIPTION,
												updateQuery: (prev, { subscriptionData }) => {
													if (!subscriptionData.data) return prev
													const newPost = subscriptionData.data.post.data

													return {
														...prev,
														posts: [newPost, ...prev.posts]
													}
												}
											})
										return <div>{posts}</div>
									}}
								</Query>
						</CardBody>
					</Card>

			      	
			</div>
		 
		)
	}
}


export default UserDisplay
