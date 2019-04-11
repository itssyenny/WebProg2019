import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Header, Navigation} from 'react-mdl';

export default class NavigationBar extends Component {
    render () {
        return (
            <div>
                <Header className="header-color" title="A L W A Y S ..." scroll>
                    <Navigation>
                        <NavLink id="text" to="/">Foods</NavLink>
                        <NavLink id="text" to="/drinks">Drinks</NavLink>
                    </Navigation>
                </Header>
            </div>
        );
    }
}