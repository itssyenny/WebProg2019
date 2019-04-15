import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Posts extends Component {
    render() {
        const postIDs = ["1", "2", "3", "4", "5"];
        const lists = postIDs.map((i, index) => (
            <li key={index}>
                <NavLink to={"/posts/" + i}>Dogs #{i}</NavLink>
            </li>
        ));
        return (
            <div>
                <h3>Click to see cute dogs</h3>
                {lists}
            </div>
        );
    }
}
