import React from 'react';

export default ({_callback, _text}) => {
    return (
        <div className="todo-app__clean">
            <button type="button" id="clear_completed_button" onClick={_callback}>{_text}</button>
        </div>
    );
};