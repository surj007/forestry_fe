import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import components from '../../../components';
import routes from '../../../routes';

class Router extends Component {
    render() {
        return (
          <Switch>
            {
              Object.keys(routes).map((item) => {
                const route = (r) => {
                  const Component = components[r.component];

                  return (
                    <Route exact key={ r.key }  path={ r.key } component={ Component } />
                  );
                }

                return routes[item].component ? route(routes[item]) : routes[item].subs.map((r) => route(r));
              })
            }
            <Route render={ () => <Redirect to="/app/home/index" /> } />
          </Switch>
        )
    }
}

export default Router;