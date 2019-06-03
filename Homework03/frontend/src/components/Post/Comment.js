import React, { Component } from 'react'
import { CardFooter } from 'reactstrap'

class Comment extends Component {
  
  render() {
    var currentText = this.props.data.text
    var currentAuthor = this.props.data.author.name
    return (
      <div>
        <CardFooter style={{backgroundColor: '#FAFFD1'}}>{`${currentAuthor} : ${currentText}`}</CardFooter>
      </div>
    )
  }
}
export default Comment
