import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import routes from '../../../routes';
// import components from '../../../components';

const Home = React.lazy(() => import('../../Home'));
const User = React.lazy(() => import('../../System/User'));
const Role = React.lazy(() => import('../../System/Role'));
const File = React.lazy(() => import('../../System/File'));
const Basic = React.lazy(() => import('../../System/Basic'));
const Version = React.lazy(() => import('../../System/Version'));
const CompanyInfo = React.lazy(() => import('../../Company/CompanyInfo'));
const CompanyDetail = React.lazy(() => import('../../Company/CompanyDetail'));
const Cert = React.lazy(() => import('../../Business/Cert'));
const PlantCert = React.lazy(() => import('../../Business/PlantCert'));
const Check = React.lazy(() => import('../../Inspect/Check'));
const Quarantine = React.lazy(() => import('../../Inspect/Quarantine'));

const components = {
  Home, User, Role, File, Basic, Version,
  CompanyInfo, CompanyDetail, Cert, PlantCert,
  Check, Quarantine
};

class Router extends Component {
  render() {
    return (
      <Switch>
        <Suspense fallback={ <div>Loading...</div> }>
          {
            Object.keys(routes).map((item) => {
              const route = (r) => {
                const Component = components[r.component];

                return (
                  <Route exact key={ r.key } path={ r.key } component={ () => <Component /> } />
                );
              }

              return routes[item].component ? route(routes[item]) : routes[item].subs.map((r) => route(r));
            })
          }
        </Suspense>
        <Route render={ () => <Redirect to="/app/home/index" /> } />
      </Switch>
    );
  }
}

export default Router;