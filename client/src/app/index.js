import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import Album from './components/Album';
import AddAlbum from './components/AddAlbum';
import Profile from './components/Profile';
import Landing from './components/Landing';
import styles from './assets/style.css';


ReactDOM.render(
  <Router history={hashHistory}>
        <Route path='/' component={Landing}/>
        <Route path='app' component={App}>
          <IndexRoute component={Home}/>
          <Route path="/about" component={About} />
          <Route path="/add" component={AddAlbum}/>
          <Route path="/album/:id" component={Album}/>
          <Route path="/profile" component={Profile}/>
        </Route>
    </Router>,

  document.getElementById('root')
);

