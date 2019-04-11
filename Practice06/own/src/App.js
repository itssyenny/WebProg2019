import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import Top_List from './Components/Top_List';
import NavigationBar from './Components/NavigationBar';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            // route path needs to be the same as NavLink to 
            <Route exact path="/" component={Home} />
            <Route path="/drinks" component={Top_List} />
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
