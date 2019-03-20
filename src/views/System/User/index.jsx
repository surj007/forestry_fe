import React, { Component } from 'react';
import { Button, Input, Table, Pagination, Modal, message, Form, Checkbox  } from 'antd';

import './index.less';

class User extends Component {
  state = {
    page: {
      current: 1,
      size: 10,
      total: 0
    },
    tableData: [],
    search: '',
    modalTitle: '',
    userModal: false,
    roles: [],
    currentUser: {}
  }

  componentDidMount() {
    this.getUserInfo(this.state.search, this.state.page.current, this.state.page.size);
    this.getRoles();
  }
  
  getRoles = () => {
    window.$http({
      url: '/admin/system/role/getRolesWithPermission',
      method: 'GET',
      params: {
        roleNameZh: ''
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        let rolesAry = [];
        for(let i of res.data.data) {
          rolesAry.push({label: i.nameZh, value: i.id});
        }
        this.setState({roles: rolesAry});
      }
    });
  }

  getUserInfo = (user, pageNum, pageSize) => {
    window.$http({
      url: '/admin/system/user/getUsersWithRole',
      method: 'GET',
      params: {user, pageNum, pageSize}
    }).then((res) => {
      if(res && res.data.code == 0) {
        let data = Object.assign({}, this.state.page, {total: res.data.data.pager.total});
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

  toggleUserModal = ($event, title, record) => {
    if(title) {
      this.setState({modalTitle: title});
    }

    record ? this.setState({currentBasic: record}) : this.setState({currentBasic: {}});

    this.setState({userModal: !this.state.userModal}, () => {
      if(title == '编辑用户') {
        // this.props.form.setFieldsValue(); 这种形式只能用在表单一直存在的时候
        // this.props.form.setFields(); 这种形式只能用在表单已经存在的时候
        // 也可以设置initialValue
        let roleAry = JSON.parse(JSON.stringify(record.role));
        for(let i in roleAry) {
          roleAry[i] = roleAry[i].id;
        }
        this.props.form.setFields({role: {value: roleAry}});
        this.props.form.setFields({username: {value: record.username}});
        this.props.form.setFields({phone: {value: record.phone}});
        this.props.form.setFields({password: {value: '-@_-@_-@_'}});
      }
    });
  }

  delUser = ($event, id) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除此用户？',
      okType: 'danger',
      onOk: () => {
        window.$http({
          url: '/admin/system/user/delUser',
          method: 'DELETE',
          data: {
            id
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('删除用户成功');
            this.getUserInfo(this.state.search, 1, this.state.page.size);
          }
        });
      }
    });
  }

  userSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        window.$http({
          url: `/admin/system/user/${this.state.modalTitle == '新增用户' ? 'addUser' : 'editUser'}`,
          method: 'POST',
          data: {
            id: this.state.currentUser.id,
            username: values.username,
            password: values.password,
            phone: values.phone
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            this.editRole(res.data.data instanceof Array ? this.state.currentUser.id : res.data.data, values.role).then((res) => {
              if(res && res.data.code == 0) {
                message.success(`${this.state.modalTitle}成功`);
                this.toggleUserModal()
                this.getUserInfo(this.state.search, 1, this.state.page.size);
              }
            });
          }
        });
      }
    });
  }

  editRole = (uid, rid) => {
    return window.$http({
      url: '/admin/system/user/editRole4User',
      method: 'POST',
      data: {
        uid, rid
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout =  {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
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
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" style={{ marginRight: '15px' }} onClick={ ($event) => { this.toggleUserModal($event, '编辑用户', record) } }>编辑</a>
            <a href="javascript: void(0);" onClick={ ($event) => { this.delUser($event, record.id) } }>删除</a>
          </span>
        )
      }
    ];

    return (
      <div className="user">
        <div className="user-header flex-space-between">
          <Button type="primary" onClick={ ($event) => { this.toggleUserModal($event, '新增用户') } }>新增用户</Button>
          
          <div style={{ width: 300 }}>
            <Input.Search placeholder="请输入用户名" onSearch={ this.handleSearch } enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ false } bordered rowKey={ record => record.id } />

        <Pagination style={{ float: 'right', marginTop: 16, marginBottom: 16  }} showQuickJumper 
        showSizeChanger showTotal={ (total) => (`总共 ${total} 条`) } onShowSizeChange={ this.changePageSize }
        total={ this.state.page.total } pageSizeOptions={ ['10', '20', '50'] } onChange={ this.changePageNum } current={ this.state.page.current } />

        
        <Modal title={ this.state.modalTitle } visible={ this.state.userModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.userSubmit } onCancel={ this.toggleUserModal }>
          <Form>
            <Form.Item label="用户名" { ...formItemLayout }>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }]
                })(
                  <Input placeholder="请输入用户名" />
                )
              }  
            </Form.Item>

            <Form.Item label="密码" { ...formItemLayout }>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input placeholder="请输入密码" type="password" />
                )
              }  
            </Form.Item>

            <Form.Item label="手机号" { ...formItemLayout }>
              {
                getFieldDecorator('phone')(
                  <Input placeholder="请输入手机号" />
                )
              }  
            </Form.Item>

            <Form.Item label="角色" { ...formItemLayout }>
              {
                getFieldDecorator('role', {
                  rules: [{ required: true, message: '请选择角色' }]
                })(
                  <Checkbox.Group options={ this.state.roles } />
                )
              }  
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(User);