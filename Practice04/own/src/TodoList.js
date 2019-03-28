import React, { Component } from 'react';
import TodoItems from './components/TodoItems';
import './App.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        /* declare global array items[] */
        this.state = {
            items: [],
            itemsToShow: "All"
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.updateButtons = this.updateButtons.bind(this);
        this.removeAllCompleted = this.removeAllCompleted.bind(this);
    }
    addItem = event => {
        if(this.inputElement.value !== "") {
            /* declare the content of the global array items[] */
            var newItem = {
                text: this.inputElement.value,
                key: Date.now(),
                complete: false
            };
            this.setState((prevState) => {
                return {
                    items: [newItem, ...prevState.items]
                };
            });
        }
        this.inputElement.value = "";
        // console.log(this.state.items);
        event.preventDefault();
    }

    removeItem(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key)
        });

        this.setState({
            items: filteredItems
        });
    }

    updateButtons = btn => {
        this.setState({
            itemsToShow: btn
        });
    }

    checkItem = key => {
        this.setState(state => ({
            items: state.items.map(item => {
                // console.log("key : " + item.key + "complete: " + item.complete);
                if(item.key === key) {
                    return {
                        ...item, complete: !item.complete
                    };
                }
                else {
                    return item;
                }
            })
        }));
    }

    removeAllCompleted = array => {
        this.setState(state => ({
            items: state.items.filter(item => !item.complete)
        }));
    }

    render() {
        return (
            <div className="todo-app__root" id="root">
                <header className="todo-app__header">
                    <p className="todo-app__title" id="name"></p>
                    <p className="todo-app__title">todos</p>
                </header>

                <div className="todo-app__main">
                    <form onSubmit={this.addItem}>
                        <input  className="todo-app__input" id="todo-input" ref={(e) => this.inputElement = e}
                                placeholder="What needs to be done?">
                        </input>
                        <TodoItems entries={this.state} check={this.checkItem} remove={this.removeItem} updateBtn={this.updateButtons} removeAll={this.removeAllCompleted} />
                    </form>
                </div>
                
            </div>
        );
    }
}

export default TodoList;
