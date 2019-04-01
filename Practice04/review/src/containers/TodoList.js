import React, {Component} from 'react';
import "./todo.css"
import "../components/Header";
import Header from '../components/Header';
import TodoMain from '../components/TodoMain';
import Footer from '../components/Footer';


let todos = [];
const [DONE, ACTIVE, DELETE] = [0, 1, 2]; // Item State
const [ALL, COMPLETED] = [0, 2]; // View State

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {itemState: [], viewState: ALL};
    }

    handleInput = e => {
        if(e.key === "Enter"){
            const value = e.target.value;
            if (value.length === 0) return;
            todos.push(value);
            let _lastState = this.state.itemState;
            _lastState.push(ACTIVE);
            this.setState(state => ({itemState: _lastState}));
            e.target.value = "";
            e.target.blur();
        }
    }

    handleItemClick = e => {
        let lastState = this.state.itemState[e.target.id];
        let newState = lastState === ACTIVE?DONE:ACTIVE;
        let newItemState = this.state.itemState;
        newItemState[e.target.id] = newState;
        this.setState({itemState: newItemState});
    }

    handleViewClick = e => {
        this.setState({viewState: parseInt(e.target.id[5])});
    }

    handleClearClick = e => {
        let newItemState = this.state.itemState;
        newItemState = newItemState.map(itemState => itemState===DONE?DELETE:itemState);
        this.setState({itemState: newItemState});
    }

    handleCrossClick = e => {
        let newItemState = this.state.itemState;
        newItemState[parseInt(e.target.id.substring(3))] = DELETE;
        this.setState({itemState: newItemState});
    }

    render() {
        let left = this.state.itemState.filter(item => item === ACTIVE).length;
        return (
            <div className="todo-app__root">
                <Header className="todo-app__header todo-app__title" text="todos"/>
                <TodoMain todoItems={todos} itemState={this.state.itemState} viewState={this.state.viewState} keyCallback={this.handleInput} clickCallback={this.handleItemClick} crossCallback={this.handleCrossClick}/>
                <Footer left={left} _viewCallback={this.handleViewClick} _clearCallback={this.handleClearClick} _viewState={this.state.viewState}/>
            </div>
        );
    }
}

export default TodoList;