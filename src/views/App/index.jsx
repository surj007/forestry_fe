import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import actions from '../../store/actions/index-actions';
import MenuCustom from './MenuCustom';
import HeaderContent from './HeaderContent';
import Router from './Router';

const { Header, Sider, Content } = Layout;

class App extends Component {
  componentWillMount() {
    if(!this.props.user.uid) {
      if(window.sessionStorage.getItem('login')) {
        this.props.getUserBySession((result) => {
          if(result) {
            this.props.getMenu();
          }
          else {
            this.props.history.push('/login');
          }
        });
      }
      else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Layout>
          <Sider theme="light">
            <MenuCustom />
          </Sider>

          <Layout>
            <Header style={{ background: '#fff' }}>
              <HeaderContent />
            </Header>

            <Content>
              <Router />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  getUserBySession: actions.getUserBySession, 
  getMenu: actions.getMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(App);