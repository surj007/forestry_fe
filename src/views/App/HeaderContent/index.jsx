import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

import routes from '../../../routes';

import './index.less';

class HeaderContent extends Component {
  findTitleByPath = () => {
    let path = this.props.location.pathname;
    for(let i in routes) {
      if(routes[i].key == path) {
        return routes[i].title
      }
      else if(routes[i].subs) {
        for(let j of routes[i].subs) {
          if(j.key == path) {
            return j.title
          }
        }
      }
    }
  }

  logout = async () => {
    await window.$service.logout();
    this.props.history.push('/login');
  }

  render() {
    const dropMenu = (
      <Menu>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={ this.logout }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;退出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="headerContent">
        <h3>{ this.findTitleByPath() }</h3>

        <div>
          <Dropdown overlay={ dropMenu }>
            <a className="ant-dropdown-link" href="javascript: void(0);">
              { window.$session.get('user').username }
              <Icon type="down" style={{ marginLeft: 5 }} />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderContent);