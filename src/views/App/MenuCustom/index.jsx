import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import routes from '../../../routes';

const SubMenu = Menu.SubMenu;

class MenuCustom extends Component {
  render() {
    return (
      <div className="menuCustom">
        <Menu mode="inline" theme="dark" defaultSelectedKeys={ [this.props.location.pathname] } defaultOpenKeys={
          Object.keys(routes).map((item) => {
            return routes[item].key
          })
        }>
          {
            Object.keys(routes).map((item) => {
              if(window.$session.get('menu').indexOf(item) != -1) {
                if(routes[item].subs) {
                  return (
                    <SubMenu title={
                      <span>
                        <Icon type={ routes[item].icon } />
                        <span>{ routes[item].title }</span>
                      </span>
                    } key={ routes[item].key }>
                      {
                        routes[item].subs.map((item) => {
                          return (
                            <Menu.Item key={ item.key }>
                              <Link to={ item.key } replace>   
                                <span>{ item.title }</span>
                              </Link>
                            </Menu.Item>
                          );
                        })
                      }
                    </SubMenu>
                  );
                }
                else {
                  return (
                    <Menu.Item key={ routes[item].key }>{
                      <Link to={ routes[item].key } replace>
                        <span>
                          <Icon type={ routes[item].icon } />
                          <span>{ routes[item].title }</span>
                        </span>
                      </Link>
                    }</Menu.Item>
                  );
                }
              }
              return null;
            })
          }
          
        </Menu>
      </div>
    )
  }
}

export default withRouter(MenuCustom);