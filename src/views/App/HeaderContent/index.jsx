import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

import routes from '../../../routes';
import actions from '../../../store/actions/index-actions';

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

  logout = () => {
    this.props.logout(() => {
      this.props.delMenu();
      this.props.history.push('/login');
    });
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
        <h3>
          {
            this.findTitleByPath()
          }
        </h3>
        <div>
          <Dropdown overlay={ dropMenu }>
            <a className="ant-dropdown-link" href="javascript: void(0);">
              { this.props.user.username }
              <Icon type="down" style={{ marginLeft: '5px' }} />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logout: actions.logout,
  delMenu: actions.delMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderContent));