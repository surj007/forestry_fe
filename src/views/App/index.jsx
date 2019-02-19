import React, { Component } from 'react';
import { Layout } from 'antd';

import MenuCustom from './MenuCustom';
import HeaderContent from './HeaderContent';
import Router from './Router';

import './index.less';

const { Header, Sider, Content } = Layout;

export default class App extends Component {
  componentWillMount() {
    if(!window.$session.get('user')) {
      this.props.history.push('/login');
    }
  }

  render() {
    if(window.$session.get('user')) {
      return (
        <div className="app">
          <Layout>
            <Sider style={{ height: '100vh', overflow: 'auto' }}>
              <MenuCustom />
            </Sider>
  
            <Layout>
              <Header style={{ background: '#FFF' }}>
                <HeaderContent />
              </Header>
  
              <Content className="app-content">
                <Router />
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }
    else {
      return null;
    }
  }
}