import React, { Component } from 'react';
import { Button, Input, Table, message, Pagination  } from 'antd';

import './User.less';

const Search = Input.Search;

export default class User extends Component {
  state = {
    page: {
      current: 1,
      size: 10,
      total: 0
    },
    tableData: [],
    search: ''
  }

  componentWillMount() {
    this.getUserInfo(this.state.search, this.state.page.current, this.state.page.size);
  }

  getUserInfo = (user, pageNum, pageSize) => {
    window.$http({
      url: '/admin/system/user/getUsersWithRole',
      method: 'GET',
      params: {user, pageNum, pageSize}
    }).then((res) => {
      if(res && res.data.code == 0) {
        let data = Object.assign({}, this.state.page, {total: res.data.data.pager.total})
        this.setState({page: data});
        this.setState({tableData: res.data.data.result});
      }
    });
  }

  handleSearch = (value) => {
    this.setState({search: value});
    this.getUserInfo(value, this.state.page.current, this.state.page.size);
  }

  changePageNum = (pageNum) => {
    let data = Object.assign({}, this.state.page, {current: pageNum})
    this.setState({page: data});
    this.getUserInfo(this.state.search, pageNum, this.state.page.size);
  }

  changePageSize = (current, size) => {
    let data = Object.assign({}, this.state.page, {current: 1, size})
    this.setState({page: data});
    this.getUserInfo(this.state.search, 1, size);
  }

  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '角色',
        render: (text, record) => (
          <div>
            {
              record.role.map((item, index) => {
                return (
                  <span key={ index } style={{ marginRight: 15 }}>{ item.nameZh }</span>
                );
              })
            }
          </div>
        )
      },
      {
        title: '手机号',
        dataIndex: 'phone'
      },
      {
        title: '操作',
        render: () => (
          <span>
            <a href="javascript: void(0);" style={{ marginRight: '15px' }}>编辑</a>
            <a href="javascript: void(0);">删除</a>
          </span>
        )
      }
    ];

    return (
      <div className="user">
        <div className="user-header flex-space-between">
          <Button type="primary">新增用户</Button>
          
          <div style={{ width: 300 }}>
            <Search placeholder="请输入用户名" onSearch={ this.handleSearch } enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ false } bordered rowKey={ record => record.id } />

        <Pagination style={{ display: 'flex',justifyContent: 'center', marginTop: 15  }} showQuickJumper 
        showSizeChanger showTotal={ (total) => (`总共 ${total} 条`) } onShowSizeChange={ this.changePageSize }
        total={ this.state.page.total } pageSizeOptions={ ['10', '20', '50'] } onChange={ this.changePageNum } current={ this.state.page.current } />
      </div>
    )
  }
}