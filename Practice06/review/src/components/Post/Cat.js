import React from "react";

export default ({ id }) => {
    return (
        <article>
            <img src={`../../cat/cat${id}.jpg`}   />
            <h1>cat #{id}</h1>
            <p>This is the {id}-th cat</p>
        </article>
    );
};
