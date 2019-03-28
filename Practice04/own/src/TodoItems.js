import React, { Component } from 'react';

class TodoItems extends Component {
    // constructor(props) {
    //     super(props);
    // }

    remove(key) {
        this.props.remove(key);
    }
    check(key) {
        this.props.check(key);
    }
    updateBtn(status) {
        this.props.updateBtn(status);
    }
    removeAll(x) {
        this.props.removeAll(x);
    }

    render () { 
        var currentUser = this.props.entries;
        var todoEntries = this.props.entries.items; //array items[]

        var itemsCount = 0;
        if(currentUser.itemsToShow === "All") {
            // todoEntries = todoEntries;
            itemsCount = todoEntries.length;
        }
        else if(currentUser.itemsToShow === "Active") {
            todoEntries = todoEntries.filter(item => !item.complete);
            itemsCount = todoEntries.filter(item => !item.complete).length
        }
        else if(currentUser.itemsToShow === "Completed") {
            todoEntries = todoEntries.filter(item => item.complete);
            itemsCount = todoEntries.filter(item => item.complete).length
        }

        return (
            <div>
                <ul className="todo-app__list">
                    {todoEntries.map(todo => (
                        <li className="todo-app__item" key={todo.key}>
                            <div className="todo-app__checkbox">
                                <input id={todo.key} style={{textDecoration: todo.complete ? "line-through" : "", opacity: todo.complete ? 0.5 : 1}} 
                                    type="checkbox" checked= {todo.complete} onChange={() => this.check(todo.key)}></input>
                                <label htmlFor={todo.key}></label>
                            </div>
                            <h1 className="todo-app__item-detail">{todo.text}</h1>
                            <img src={require('./img/x.png')} alt="remove-icon" className="todo-app__item-x" id={todo.key} onClick={() => this.remove(todo.key)}></img>
                        </li>
                    ))}
                </ul>
                <footer className="todo-app__footer">
                    <div className="todo-app__total">
                        {itemsCount} left
                    </div>
                    <ul className="todo-app__view-buttons">
                        <li><button onClick={() => this.updateBtn("All")}>All</button></li>
                        <li><button onClick={() => this.updateBtn("Active")}>Active</button></li>
                        <li><button onClick={() => this.updateBtn("Completed")}>Completed</button></li>
                    </ul>
                    <div className="todo-app__clean">
                        <button onClick={() => this.removeAll(todoEntries)}>Clear completed</button>
                    </div>
                </footer>
            </div>

        );
    }
}
export default TodoItems;