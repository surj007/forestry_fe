import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './views/App';
import Login from './views/Login';

export default class Page extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/app" component={ App } />
          <Route path="/login" component={ Login } />
          <Redirect to="/app/home/index"/>
        </Switch>
      </HashRouter>
    );
  }
}