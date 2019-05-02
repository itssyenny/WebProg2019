import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_type}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);

export default class TodosList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:8081/todos/')
        .then(response => {
            this.setState({ todos : response.data });
        })
        .catch(err => {
            console.log(err);
        });
    }

    //update automatically after changing
    componentDidUpdate() {
        axios.get('http://localhost:8081/todos/')
        .then(response => {
            this.setState({ todos : response.data });
        })
        .catch(err => {
            console.log(err);
        });
    }

    // iterate through the array of todo lis items using map function
    todoList() {
        return this.state.todos.map(function(currentTodo, index){
            return <Todo todo={currentTodo} key={index} />;
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Your Menu Lists</h3>
                <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}