import React, { Component } from 'react';
import { Button, Input, Table, Modal, message, Form  } from 'antd';

import './index.less';

class Basic extends Component {
  state = {
    search: '',
    tableData: [],
    modalTitle: [],
    basicModal: false,
    currentBasic: {}
  }

  componentDidMount() {
    this.getBasicInfo(this.state.search);
  }

  getBasicInfo(basicName) {
    window.$http({
      url: '/admin/system/basic/getBasicInfo',
      method: 'GET',
      params: {
        basicName
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        let data = Object.values(res.data.data);
        data.forEach((item) => {
          item.info = item.info.join('，');
        });
        this.setState({tableData: data});
      }
    });
  }

  handleSearch = (value) => {
    this.setState({search: value});
    this.getBasicInfo(value);
  }

  delBasic = ($event, id) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除此字典？（删除后可能导致app上基础资料无法显示）',
      okType: 'danger',
      onOk: () => {
        window.$http({
          url: '/admin/system/basic/delBasic',
          method: 'DELETE',
          data: {
            id
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('删除字典成功');
            this.getBasicInfo(this.state.search);
          }
        });
      }
    });
  }

  basicSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        window.$http({
          url: `/admin/system/basic/${this.state.modalTitle == '新增字典' ? 'addBasic' : 'editBasic'}`,
          method: this.state.modalTitle == '新增字典' ? 'PUT' : 'POST',
          data: {
            id: this.state.currentBasic.id,
            basicName: values.name,
            basicValue: values.info
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success(`${this.state.modalTitle}成功`);
            this.toggleBasicModal();
            this.getBasicInfo(this.state.search);
          }
        });
      }
    });
  }

  toggleBasicModal = ($event, title, record) => {
    if(title) {
      this.setState({modalTitle: title});
    }

    record ? this.setState({currentBasic: record}) : this.setState({currentBasic: {}});

    this.setState({basicModal: !this.state.basicModal});
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout =  {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const columns = [
      {
        title: '字典名称',
        dataIndex: 'name'
      },
      {
        title: '值',
        dataIndex: 'info'
      },
      {
        title: '操作',
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" style={{ marginRight: '15px' }} onClick={ ($event) => { this.toggleBasicModal($event, '编辑字典', record) } }>编辑</a>
            <a href="javascript: void(0);" onClick={ ($event) => { this.delBasic($event, record.id) } }>删除</a>
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
      <div className="basic">
        <div className="basic-header flex-space-between">
          <Button type="primary" onClick={ ($event) => { this.toggleBasicModal($event, '新增字典') } }>新增字典</Button>
          
          <div style={{ width: 300 }}>
            <Input.Search placeholder="请输入字典名称" onSearch={ this.handleSearch } enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ pagination } bordered rowKey={ record => record.id } />

        <Modal title={ this.state.modalTitle } visible={ this.state.basicModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.basicSubmit } onCancel={ this.toggleBasicModal }>
          <Form>
            <Form.Item label="字典名称" { ...formItemLayout } extra="修改字典名称可能导致app基础资料无法显示">
              {
                getFieldDecorator('name', {
                  initialValue: this.state.currentBasic.name,
                  rules: [{ required: true, message: '请输入字典名称' }]
                })(
                  <Input placeholder="请输入字典名称" />
                )
              }  
            </Form.Item>

            <Form.Item label="值" { ...formItemLayout } extra="请在不同的选项中间加英文逗号">
              {
                getFieldDecorator('info', {
                  initialValue: this.state.currentBasic.info,
                  rules: [{ required: true, message: '请输入值' }]
                })(
                  <Input.TextArea  placeholder="请输入值" rows="3" />
                )
              }  
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Basic);