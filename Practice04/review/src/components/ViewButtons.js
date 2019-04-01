import React from 'react';

let GenBtn = (_buttons, _callback, _viewState) => {
    let Btns = [];
    const viewStyle = {'borderColor': "rgb(0,0,0)"};
    const originalStyle = {'borderColor': "rgb(255,255,255)"};
    for(let i = 0; i < _buttons.length;i++){
        Btns.push(
            <li>
                <button type="button" id={"view_"+i.toString()} onClick={_callback} style={i===_viewState?viewStyle:originalStyle}>{_buttons[i]}</button>
            </li>
        );
    }
    return Btns;
}

export default ({_buttons, _callback, _viewState}) => {
    return (
        <ul className="todo-app__view-buttons">
            {GenBtn(_buttons, _callback, _viewState)}
        </ul>
    );
};