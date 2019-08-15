import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from './store/actions';

import App from './views/App';
import Login from './views/Login';

const { setCompany, setCompanyAsync } = actions;

// 定义函数式组件
function Page (props) {
  return (
    // props.name
    // props.company
    // props.setCompany(data)

    <HashRouter>
      <Switch>
        <Route path="/app" component={ App } />
        <Route path="/login" component={ Login } />
        <Redirect to="/app/home/index" />
      </Switch>
    </HashRouter>
  );
}

const mapStateToPorps = state => {
  return {
    company: state.company
  }
};
const mapDispatchToProps = {
  setCompany, setCompanyAsync
};

export default connect(mapStateToPorps, mapDispatchToProps)(Page);