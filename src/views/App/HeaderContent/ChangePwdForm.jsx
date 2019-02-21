import React, { Component } from 'react';
import { Form, Input } from 'antd';

class ChangePwdForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout =  {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <Form>
        <Form.Item label="原始密码" { ...formItemLayout }>
          {
            getFieldDecorator('oldPwd', {
              rules: [{ required: true, message: '请输入原始密码' }]
            })(
              <Input placeholder="请输入原始密码" />
            )
          }        
        </Form.Item>

        <Form.Item label="新密码" { ...formItemLayout }>
          {
            getFieldDecorator('newPwd', {
              rules: [{ required: true, message: '请输入新密码' }]
            })(
              <Input type="password" placeholder="请输入新密码" />
            )
          }
        </Form.Item>
        
        <Form.Item label="确认新密码" { ...formItemLayout }>
          {
            getFieldDecorator('confirmNewPwd', {
              rules: [{ required: true, message: '请再次输入新密码' }]
            })(
              <Input type="password" placeholder="请再次输入新密码" />
            )
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ChangePwdForm);