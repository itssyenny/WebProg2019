import React from 'react';

export default ({onKeyPress}) => {
    return <input type="text" 
        placeholder="What needs to be done?"
        onKeyPress={onKeyPress}/>;
};