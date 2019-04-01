import React from 'react';
import TodoItem from '../components/TodoItem';

/* 
todoItems = [TODO TEXT]
itemState = [ACTIVE or DONE or DELETE]
*/
const [DONE, ACTIVE, DELETE] = [0, 1, 2]; // Item State
const [ALL, COMPLETED] = [0, 2]; // View State

let findAllIndex = (Arr, func) => {
    let indices = [];
    for(let i = 0; i < Arr.length; i++){
        if(func(Arr[i])) indices.push(i);
    }
    return indices;
}

let getIdx = (itemState, viewState) => {
    if(viewState === ALL) return findAllIndex(itemState, elem => elem !== DELETE);
    if(viewState === COMPLETED) return findAllIndex(itemState, elem => elem === DONE);
    if(viewState === ACTIVE) return findAllIndex(itemState, elem => elem === ACTIVE);
}

export default ({todoItems, itemState, viewState, keyCallback, clickCallback, crossCallback}) => {
    let indices = getIdx(itemState, viewState);
    return (
        <section className="todo-app__main">
            <input className="todo-app__input" id='todo-input' placeholder="What needs to be done?" onKeyPress={keyCallback}></input>
            <ul className="todo-app__list" id="todo-list">
                {indices.map(idx => <TodoItem _id={idx} _done={itemState[idx]} _text={todoItems[idx]} onClick={clickCallback} crossCallback={crossCallback}/>)}
            </ul>
        </section>
    );
};