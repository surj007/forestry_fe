import React, { Component } from 'react';
import { Button, Input, Radio, Card, message, Form, Switch, Upload, Icon  } from 'antd';

import './index.less';

class Version extends Component {
  state = {
    type: 'Android',
    fileList: [],
    errMsg: ''
  }

  versionSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(this.state.fileList.length == 0) {
        this.setState({errMsg: '请上传文件'});
        return;
      }

      window.$http({
        url: `/admin/system/version/addVersion`,
        method: 'PUT',
        data: {
          title: values.title,
          description: values.description,
          type: this.state.type,
          version_id: values.version_id,
          version_name: values.version_name,
          url: this.state.fileList[0].url,
          force_update: values.force ? 1 : 0
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          message.success(`添加新版本成功`);
          this.props.form.resetFields();
          this.setState({fileList: []});
        }
      });
    });
  }

  getOssSign = () => {
    return new Promise((resolve) => {
      window.$http({
        url: `/admin/oss/getSign`,
        method: 'GET',
        params: {
          path: 'app/Android/'
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
    if(file.name.split('.')[1] != 'apk') {
      return false;
    }
    if(file.size > 1000 * 1000 * 20) {
      return false;
    }

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
      name: file.name,
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

    const buttonLayout =  {
      wrapperCol: {span: 19, offset: 14},
    };

    const uploadButton = (
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    );

    return (
      <div className="version flex-center-x">
          <Card title={ this.state.type } style={{ width: 600 }}>
            <Form>
              <Form.Item label="操作系统" { ...formItemLayout }>
                {
                  <Radio.Group value={ this.state.type } onChange={ ($event) => { this.setState({ type: $event.target.value }) } }>
                    <Radio value="Android">Android</Radio>
                    <Radio value="IOS">IOS</Radio>
                  </Radio.Group>
                }  
              </Form.Item>

              <Form.Item label="标题" { ...formItemLayout }>
                {
                  getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入标题' }]
                  })(
                    <Input placeholder="请输入标题" />
                  )
                }  
              </Form.Item>

              <Form.Item label="描述" { ...formItemLayout }>
                {
                  getFieldDecorator('description', {
                    rules: [{ required: true, message: '请输入描述' }]
                  })(
                    <Input placeholder="请输入描述" />
                  )
                }  
              </Form.Item>

              <Form.Item label="版本号" { ...formItemLayout }>
                {
                  getFieldDecorator('version_id', {
                    rules: [{ required: true, message: '请输入版本号' }]
                  })(
                    <Input placeholder="请输入版本号" />
                  )
                }  
              </Form.Item>

              <Form.Item label="版本名称" { ...formItemLayout }>
                {
                  getFieldDecorator('version_name', {
                    rules: [{ required: true, message: '请输入版本名称' }]
                  })(
                    <Input placeholder="请输入版本名称" />
                  )
                }  
              </Form.Item>

              <Form.Item label="是否强制更新" { ...formItemLayout }>
                {
                  getFieldDecorator('force', {
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }  
              </Form.Item>

              {
                this.state.type == 'Android' ? (
                  <Form.Item label="更新地址" { ...formItemLayout } required validateStatus="error" help={ this.state.errMsg } extra="只能上传apk文件，且不能超过20M">
                    <Upload beforeUpload={ this.beforeUpload } fileList={ this.state.fileList } onRemove={ () => { this.setState({fileList: []}) } }>
                      { this.state.fileList.length >= 1 ? null : uploadButton }
                    </Upload>
                  </Form.Item>
                ) : null
              }

              <Form.Item { ...buttonLayout }>
                <Button onClick={ () => { this.props.form.resetFields() || this.setState({fileList: []}) } } style={{ marginRight: 10 }}>重置</Button>
                <Button type="primary" onClick={ this.versionSubmit }>保存</Button>
              </Form.Item>
            </Form>
        </Card>
        
      </div>
    )
  }
}

export default Form.create()(Version);