import React, { Component } from 'react';
import { Button, Input, Table, Modal, message, Form, Checkbox  } from 'antd';

import './index.less';

class Role extends Component {
  state = {
    tableData: [],
    search: '',
    modalTitle: '',
    roleModal: false,
    permission: [],
    currentRole: {}
  }

  componentDidMount() {
    this.getRoleInfo(this.state.search);
    this.getPermission();
  }

  getRoleInfo(roleNameZh) {
    window.$http({
      url: '/admin/system/role/getRolesWithPermission',
      method: 'GET',
      params: {
        roleNameZh
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({tableData: res.data.data});
      }
    });
  }

  getPermission() {
    window.$http({
      url: '/admin/system/permission/getPermission',
      method: 'GET'
    }).then((res) => {
      if(res && res.data.code == 0) {
        let permissionAry = [];
        for(let i of res.data.data) {
          permissionAry.push({label: `${i.module}（${i.description}）`, value: i.id});
        }
        this.setState({permission: permissionAry});
      }
    });
  }

  roleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        window.$http({
          url: `/admin/system/role/${this.state.modalTitle == '新增角色' ? 'addRole' : 'editRole'}`,
          method: 'POST',
          data: {
            id: this.state.currentRole.id,
            name: values.name,
            nameZh: values.nameZh
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            this.editPermission(res.data.data instanceof Array ? this.state.currentRole.id : res.data.data, values.permission).then((res) => {
              if(res && res.data.code == 0) {
                message.success(`${this.state.modalTitle}成功`);
                this.toggleRoleModal()
                this.getRoleInfo(this.state.search);
              }
            });
          }
        });
      }
    });
  }

  editPermission = (rid, pid) => {
    return window.$http({
      url: '/admin/system/role/editPermission4Role',
      method: 'POST',
      data: {
        pid, rid
      }
    });
  }

  toggleRoleModal = ($event, title, record) => {
    if(title) {
      this.setState({modalTitle: title});
    }

    let recordCopy = {};
    record && (recordCopy = JSON.parse(JSON.stringify(record)));
    record && (recordCopy.permission = recordCopy.permission.map((item) => {
      return item.id;
    }));
    this.setState({currentRole: recordCopy});

    this.setState({roleModal: !this.state.roleModal});
  }

  handleSearch = (value) => {
    this.setState({search: value});
    this.getRoleInfo(value);
  }

  delRole = ($event, id) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除此角色？',
      okType: 'danger',
      onOk: () => {
        window.$http({
          url: '/admin/system/role/delRole',
          method: 'DELETE',
          data: {
            id
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('删除角色成功');
            this.getRoleInfo(this.state.search);
          }
        });
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
        title: '角色中文名',
        dataIndex: 'nameZh'
      },
      {
        title: '角色英文名',
        dataIndex: 'name'
      },
      {
        title: '角色权限',
        render: (text, record) => (
          <div>
            {
              record.permission.map((item, index) => {
                let tmp = ", ";
                if(index == 0) {
                  tmp = "";
                }
                return (
                  <span key={ index }>{ tmp + item.module }</span>
                );
              })
            }
          </div>
        )
      },
      {
        title: '操作',
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" style={{ marginRight: '15px' }} onClick={ ($event) => { this.toggleRoleModal($event, '编辑角色', record) } }>编辑</a>
            <a href="javascript: void(0);" onClick={ ($event) => { this.delRole($event, record.id) } }>删除</a>
          </span>
        )
      }
    ];

    const pagination = {
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => (`总共 ${total} 条`)
    }

    return (
      <div className="role">
        <div className="role-header flex-space-between">
          <Button type="primary" onClick={ ($event) => { this.toggleRoleModal($event, '新增角色') } }>新增角色</Button>
          
          <div style={{ width: 300 }}>
            <Input.Search placeholder="请输入角色中文名" onSearch={ this.handleSearch } enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ pagination } bordered rowKey={ record => record.id } />

        <Modal title={ this.state.modalTitle } visible={ this.state.roleModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.roleSubmit } onCancel={ this.toggleRoleModal }>
          <Form>
            <Form.Item label="角色中文名" { ...formItemLayout }>
              {
                getFieldDecorator('nameZh', {
                  initialValue: this.state.currentRole.nameZh,
                  rules: [{ required: true, message: '请输入角色中文名' }]
                })(
                  <Input placeholder="请输入角色中文名" />
                )
              }  
            </Form.Item>

            <Form.Item label="角色英文名" { ...formItemLayout }>
              {
                getFieldDecorator('name', {
                  initialValue: this.state.currentRole.name,
                  rules: [{ required: true, message: '请输入角色英文名' }]
                })(
                  <Input placeholder="请输入角色英文名" />
                )
              }  
            </Form.Item>

            <Form.Item label="角色权限" { ...formItemLayout }>
              {
                getFieldDecorator('permission', {
                  initialValue: this.state.currentRole.permission
                })(
                  <Checkbox.Group>
                    {
                      this.state.permission.map((item, index) => {
                        let style = {marginTop: 5};
                        if(index == 0) {
                          style = {marginTop: 5, marginLeft: 8};
                        }
                        return (
                          <Checkbox value={ item.value } key={ index } style={ style }>{ item.label }</Checkbox>
                        )
                      })
                    }
                  </Checkbox.Group>
                )
              }  
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Role);