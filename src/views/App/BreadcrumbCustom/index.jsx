import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import routes from '../../../routes';

class BreadcrumbCustom extends Component {
  state = {
    path: {}
  }

  findTitleByPath = () => {
    let path = this.props.location.pathname;
    for(let i in routes) {
      if(routes[i].key == path) {
        return {first: routes[i].title, second: null};
      }
      else if(routes[i].subs) {
        for(let j of routes[i].subs) {
          if(j.key == path) {
            return {first: routes[i].title, second: j.title};
          }
        }
      }
    }
  }

  render() {
    return (
      <Breadcrumb separator=">">
        <Breadcrumb.Item>{ this.findTitleByPath() && this.findTitleByPath().first }</Breadcrumb.Item>
        <Breadcrumb.Item>{ this.findTitleByPath() && this.findTitleByPath().second }</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default withRouter(BreadcrumbCustom);