import React, { Component } from 'react';
import { Layout } from 'antd';

import MenuCustom from './MenuCustom';
import HeaderContent from './HeaderContent';
import Router from './Router';
import BreadcrumbCustom from './BreadcrumbCustom';

import './index.less';

const { Header, Sider, Content } = Layout;

class App extends Component {
  componentDidMount() {
    if(!window.$session.get('user')) {
      this.props.history.push('/login');
    }
  }

  render() {
    if(window.$session.get('user')) {
      return (
        <div className="app">
          <Layout>
            <Header style={{ background: '#FFF', height: 49, paddingLeft: 20 }}>
              <HeaderContent />
            </Header>
  
            <Layout>
              <Sider style={{ height: 'calc(100vh - 49px)', overflow: 'auto' }}>
                <MenuCustom />
              </Sider>

              <Layout>
                <Header style={{ background: '#f0f2f5', height: 20, paddingLeft: 20, marginTop: 15 }}>
                  <BreadcrumbCustom />
                </Header>

                <Content className="app-content" style={{ marginTop: 15, marginBottom: 15 }}>
                  <Router />
                </Content>
              </Layout>
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

export default App;