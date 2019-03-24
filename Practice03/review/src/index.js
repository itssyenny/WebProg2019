import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Post = { 
  Title: ['Hello World!', 'Second Posts'],
  Description: ['Welcome to NTU', 'this is the basketball court of NTU'],
  Postdate: ['Mar 23, 2019', 'Mar 24, 2019'],
  BlogImage: ['https://i.imgur.com/KSoA1ff.jpg', 'https://i.imgur.com/Q5H2Rd0.jpg'],
  Content: ['content of post1', 'content of post2']
};


ReactDOM.render(<App Post = {Post} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
