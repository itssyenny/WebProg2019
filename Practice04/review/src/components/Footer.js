import React from 'react';
import CleanButton from './CleanButton';
import ViewButtons from './ViewButtons';

export default ({left, _viewCallback, _clearCallback, _viewState}) => {
    return (
        <footer id="todo-footer" className="todo-app__footer">
            <div className="todo-app__total">
                <span id="left_count">{left}</span> left
            </div>
            <ViewButtons _buttons={["All", "Active", "Completed"]} _callback={_viewCallback} _viewState={_viewState}/>
            <CleanButton _callback={_clearCallback} _text={left>0?"Clear completed":""} />
        </footer>
    );
};