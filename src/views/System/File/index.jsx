import React, { Component } from 'react';
import { Button, Input, Table, Modal, message, Form, Upload, Icon } from 'antd';

import './index.less';

class File extends Component {
  state = {
    search: '',
    tableData: [],
    modalTitle: [],
    fileModal: false,
    currentFile: {},
    fileList: [],
    errMsg: ''
  }

  componentDidMount() {
    this.getFileInfo(this.state.search);
  }

  getFileInfo(fileName) {
    window.$http({
      url: '/admin/system/file/getFileInfo',
      method: 'GET',
      params: {
        fileName
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({tableData: Object.values(res.data.data)});
      }
    });
  }

  handleSearch = (value) => {
    this.setState({search: value});
    this.getFileInfo(value);
  }

  delFile = ($event, id) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除此文件？（删除后可能导致app上文件无法下载）',
      okType: 'danger',
      onOk: () => {
        window.$http({
          url: '/admin/system/file/delFile',
          method: 'DELETE',
          data: {
            id
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('删除文件成功');
            this.getFileInfo(this.state.search);
          }
        });
      }
    });
  }

  fileSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if(this.state.fileList.length == 0) {
        this.setState({errMsg: '请上传文件'});
        return;
      }

      window.$http({
        url: `/admin/system/file/${this.state.modalTitle == '新增文件' ? 'addFile' : 'editFile'}`,
        method: this.state.modalTitle == '新增文件' ? 'PUT' : 'POST',
        data: {
          id: this.state.currentFile.id,
          name: values.name,
          url: this.state.fileList[0].url,
          size: this.state.fileList[0].size,
          type: this.state.fileList[0].type,
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          message.success(`${this.state.modalTitle}成功`);
          this.toggleFileModal();
          this.getFileInfo(this.state.search);
        }
      });
    });
  }

  toggleFileModal = ($event, title, record) => {
    if(title) {
      this.setState({modalTitle: title});
    }

    record ? this.setState({currentFile: record}) : this.setState({currentFile: {}});

    record ? this.setState({fileList: [
      {
        uid: '-1',
        url: record.url,
        size: record.size,
        type: record.type
      }
    ]}) : this.setState({fileList: []});

    this.setState({errMsg: ''});

    this.setState({fileModal: !this.state.fileModal});
  }

  getOssSign = () => {
    return new Promise((resolve) => {
      window.$http({
        url: `/admin/oss/getSign`,
        method: 'GET',
        params: {
          path: 'image/admin/'
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          resolve(res.data.data);
        }
      });
    });
  }

  upload2Oss = (host, data) => {
    return new Promise((resolve) => {
      window.$http({
        url: host,
        method: 'POST',
        data
      }).then((res) => {
        resolve();
      });
    });
  }

  getSignatureUrl = (data) => {
    return new Promise((resolve) => {
      window.$http({
        url: `/admin/oss/getSignatureUrl`,
        method: 'GET',
        params: {
          path: data.path,
          fileName: data.fileName
        }
      }).then((res) => {
        resolve(res.data.data);
      });
    });
  }

  beforeUpload = async (file) => {
    let signData = await this.getOssSign();

    let uploadData = new FormData();
    let random = Math.random();
    uploadData.append('key', `${signData.dirPath}${signData.key}_${random}.${file.name.split('.')[1]}`);
    uploadData.append('ossAccessKeyId', signData.ossAccessKeyId);
    uploadData.append('policy', signData.policy);
    uploadData.append('Signature', signData.Signature);
    uploadData.append('host', signData.host);
    uploadData.append('success_action_status', signData.success_action_status);
    uploadData.append('file', file);

    await this.upload2Oss(signData.host, uploadData);

    let SignatureUrl = await this.getSignatureUrl({
      path: signData.dirPath,
      fileName: `${signData.key}_${random}.${file.name.split('.')[1]}`
    });

    this.setState({fileList: [{
      uid: '-1',
      url: SignatureUrl,
      size: file.size / 1000 + 'KB',
      type: file.name.split('.')[1]
    }]});

    this.setState({errMsg: ''});

    return false;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout =  {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const columns = [
      {
        title: '文件名',
        dataIndex: 'name'
      },
      {
        title: '文件大小',
        dataIndex: 'size'
      },
      {
        title: '文件格式',
        dataIndex: 'type'
      },
      {
        title: '操作',
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript: void(0);" style={{ marginRight: '15px' }} onClick={ ($event) => { this.toggleFileModal($event, '编辑文件', record) } }>编辑</a>
            <a href="javascript: void(0);" onClick={ ($event) => { this.delFile($event, record.id) } }>删除</a>
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

    const uploadButton = (
      <div>
        <Icon type="plus" />
      </div>
    );

    return (
      <div className="file">
        <div className="file-header flex-space-between">
          <Button type="primary" onClick={ ($event) => { this.toggleFileModal($event, '新增文件') } }>新增文件</Button>
          
          <div style={{ width: 300 }}>
            <Input.Search placeholder="请输入文件名" onSearch={ this.handleSearch } enterButton allowClear />
          </div>
        </div>

        <Table columns={ columns } dataSource={ this.state.tableData } pagination={ pagination } bordered rowKey={ record => record.name } />

        <Modal title={ this.state.modalTitle } visible={ this.state.fileModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.fileSubmit } onCancel={ this.toggleFileModal }>
          <Form>
            <Form.Item label="文件名称" { ...formItemLayout }>
              {
                getFieldDecorator('name', {
                  initialValue: this.state.currentFile.name,
                  rules: [{ required: true, message: '请输入文件名称' }]
                })(
                  <Input placeholder="请输入文件名称" />
                )
              }  
            </Form.Item>

            <Form.Item label="上传文件" { ...formItemLayout } required validateStatus="error" help={ this.state.errMsg }>
              <Upload listType="picture-card" fileList={ this.state.fileList } beforeUpload={ this.beforeUpload } 
              onRemove={ () => { this.setState({fileList: []}) } }>
                { this.state.fileList.length >= 1 ? null : uploadButton }
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(File);