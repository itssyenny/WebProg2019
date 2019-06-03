import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

import {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  CREATE_USER_MUTATION,
  USERS_SUBSCRIPTION
} from '../../graphql'
import User from '../../components/Post/User'
import UserDisplay from '../../components/Post/UserDisplay'
import classes from './App.module.css'

let unsubscribea = null
class App extends Component {
  constructor(props) {
    super(props)
    this.toggleBtn = this.toggleBtn.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleAuthor = this.handleAuthor.bind(this)
    this.handleList = this.handleList.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.state = {
      formTitle: '',
      formBody: '',
      dropdownOpen: false,
      openForm: false,
      authorId: '',
      authorName: '',
      openList: '',
      openListBoolean: false,
      commentHandle: '',
      commentHandleBoolean: false,
      dropdownOpen1: false,
      userName: '',
      userEmail: ''
    }
  }

  toggleBtn() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }

  toggle() {
    this.setState({ dropdownOpen1: true})
  }
  
  handleUserSubmit = e => {
    e.preventDefault()

    const { userName, userEmail } = this.state  

    if (!userName || !userEmail) return

    this.createUser({
      variables: {
        name: userName,
        email: userEmail,
      }
    })
    this.setState({
      userName: '',
      userEmail: '',
      dropdownOpen1: !this.state.dropdownOpen1
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, authorId, authorName } = this.state

    if (!formTitle || !formBody) return

    console.log(`handleFormSubmit: title ${formTitle} authorId ${authorId} authorName ${authorName}`)
    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: authorId
      }
    })

    this.setState({
      formTitle: '',
      formBody: ''
    })
  }

  handleAuthor(id, name) {
    this.setState({ 
      authorId: id,
      authorName: name,
      openForm: true
    })
  }

  handleList(index) {
    const { openListBoolean } =  this.state
    this.setState({ openList: index, openListBoolean: !openListBoolean})
    // console.log('Click on Author\'s button at index ' + index + ' with current status is ' + this.state.openListBoolean)
  }

  handleComment(index) {
    const { commentHandleBoolean } =  this.state
    this.setState({ commentHandle: index, commentHandleBoolean: !commentHandleBoolean})
  } 


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
       
        <Row>
          <Col xs="6" className={classes.form}>
          <Mutation mutation={CREATE_USER_MUTATION}>
            {createUser => {
              this.createUser = createUser
              return (
                <Form onSubmit={this.handleUserSubmit}>
                  <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle}>
                    <DropdownToggle caret>Register</DropdownToggle>
                  </ButtonDropdown>
                  <br/><br/>
                  <div  style={{display: this.state.dropdownOpen1 ? "block" : "none"}}>
                    <FormGroup row>
                      <Label for="name" sm={2}>
                        Name
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="name"
                          value={this.state.userName}
                          id="name"
                          placeholder="Name..."
                          onChange={e =>
                            this.setState({ userName: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="email" sm={2}>Email</Label>
                      <Col sm={10}>
                        <Input
                          name="email"
                          value={this.state.userEmail}
                          id="email"
                          placeholder="Email..."
                          onChange={e =>
                            this.setState({ userEmail: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <Button type="submit" color="primary">
                    Submit!
                  </Button>
                </div>
              </Form>
            )
          }}
          </Mutation>
          </Col>
        </Row>

        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost
                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtn}>
                      <DropdownToggle caret>Author</DropdownToggle>
                      <DropdownMenu>
                        <Query query={POSTS_QUERY}>
                          {({ loading, error, data, subscribeToMore }) => {
                            if (loading) return <p>Loading in posts...</p>
                            if (error) return <p>Error in posts(</p>

                              if (!unsubscribea)
                                unsubscribea = subscribeToMore({
                                document: USERS_SUBSCRIPTION,
                                updateQuery: (prev, { subscriptionData }) => {
                                  if (!subscriptionData.data) return prev
                                  const newUser = subscriptionData.data.user.data
                                  console.log(newUser)
                                  return {
                                    ...prev,
                                    users: [...prev.users,newUser]
                                  }
                                }
                              })
                            const users = data.users.map((user, id) => (
                              <User key={id} data={user} handleAuthor={this.handleAuthor}/>
                            ))
                            
                            return <div>{users}</div>
                          }}
                        </Query>
                      </DropdownMenu>

                    </ButtonDropdown>
                    <br/><br/>
                    <div style={{display: this.state.openForm ? "block" : "none"}}>
                      <FormGroup row>
                        <Label for="title" sm={2}>
                          Title
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="title"
                            value={this.state.formTitle}
                            id="title"
                            placeholder="Post title..."
                            onChange={e =>
                              this.setState({ formTitle: e.target.value })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Label for="body">Body</Label>
                        <Input
                          type="textarea"
                          name="body"
                          value={this.state.formBody}
                          id="body"
                          placeholder="Post body..."
                          onChange={e =>
                            this.setState({ formBody: e.target.value })
                          }
                        />
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Post!
                      </Button>
                    </div>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY}>
               {({ loading, error, data, subscribeToMore }) => {
                  if (loading) return <p>Loading in users display</p>
                  if (error) return <p>Error in users display</p>
                  const usersa = data.users.map((user, id) => (
                    <UserDisplay data={user} key={id} handleList={this.handleList} openList={this.state.openList} openListBoolean={this.state.openListBoolean}
                    handleComment={this.handleComment} commentHandle={this.state.commentHandle} commentHandleBoolean={this.state.commentHandleBoolean}/>
                    
                  ))
                  return <div>{usersa}</div>
                }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
