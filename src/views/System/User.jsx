import React, { Component } from 'react';
import { Button, Input, Table, message } from 'antd';

import './User.less';

const Search = Input.Search;

class User extends Component {
  state = {
    page: {
      current: 1,
      size: 10,
      total: 0
    },
    tableData: []
  }

  componentWillMount() {
    this.getUserInfo(this.state.page.current, this.state.page.size);
  }

  getUserInfo = (pageNum, pageSize) => {
    window.$http({
      url: '/admin/system/user/getUsersWithRole',
      method: 'GET',
      params: {
        pageNum,
        pageSize
      }
    }).then((res) => {
      if(res.data.code == 0) {
        let data = Object.assign({}, this.state.page, {total: res.data.data.pager.total})
        this.setState({page: data});
        this.setState({tableData: res.data.data.result});
      }
      else {
        message.error(res.data.message);
      }
    }).catch((e) => {
      console.warn(e);
      message.error('网络错误，请重试');
    });
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
                  <span key={ index } style={{ marginRight: '15px' }}>{ item.nameZh }</span>
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

    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => (`总共 ${total} 条`),
      total: this.state.page.total,
      pageSizeOptions: ['10', '20', '50'],
      onChange: (pageNum, pageSize) => {
        this.getUserInfo(pageNum, pageSize);
      }
    };

    return (
      <div className="user">
        <div className="user-header flex-space-between">
          <Button type="primary">新增用户</Button>
          <div style={{ width: 300 }}>
            <Search placeholder="请输入用户名" onSearch={value => console.log(value)} enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ pagination }
        bordered rowKey={ record => record.id } />
      </div>
    )
  }
}

export default User;