import React from "react";

export default ({ id }) => {
    return (
        <article>
            <img src={`../../dog/dog${id}.jpg`}   />
            <h1>dog #{id}</h1>
            <p>This is the {id}-th dog</p>
        </article>
    );
};
