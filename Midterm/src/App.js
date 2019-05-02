import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from 'react-bootstrap';

import CreateTodo from './Components/create-todo';
import TodosList from './Components/todos-list';
import EditTodo from './Components/edit-todo';
import Foods from './Components/Foods';
import Beverages from './Components/Beverages';

// import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <Link to="/" className="navbar-brand" style={{marginLeft: 80, paddingTop: 10, fontSize: 38}}><b>A L W A Y S ... &nbsp; &nbsp; &nbsp; &nbsp;</b></Link>
            
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto" style={{marginLeft: 600, paddingTop: 10}}>
                
                <li className="navbar-item">
                  <Link to="/foods" className="nav-link">Foods</Link>
                </li>

                <li className="navbar-item">
                  <Link to="/beverages" className="nav-link">Beverages</Link>
                </li>

                <NavDropdown title="Your Menu" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/" className="nav-link">Display Menu</Link>
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item>
                    <Link to="/create" className="nav-link">Create Menu</Link>
                  </NavDropdown.Item> 

                </NavDropdown>
              </ul>
            </div>
        </nav>
        <br />
        
        <Switch>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/foods" component={Foods} />
          <Route path="/beverages" component={Beverages} />
        </Switch>
       
      </div>
      </Router>
      
    );
  }
}

export default App;
