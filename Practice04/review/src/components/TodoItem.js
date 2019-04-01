import React from 'react';
import xIcon from '../img/x.png';

const [DONE, ACTIVE, DELETE] = [0, 1, 2]; // Item State

export default ({_id, _done, _text, onClick, crossCallback}) => {
    const doneStyle = {'opacity': 0.5, 'textDecoration': 'line-through'};
    const originalStyle = {};
    return (
        <li className="todo-app__item" style={_done===DONE?doneStyle:originalStyle}>
            <div className="todo-app__checkbox">
                <input type="checkbox" id={_id} checked={_done===DONE} onClick={onClick}/>
                <label htmlFor={_id}></label>
            </div>
            <h1 className="todo-app__item-detail">{_text}</h1>
            <img src={xIcon} className="todo-app__item-x" id={"img"+_id.toString()} onClick={crossCallback}></img>
        </li>
    );
};