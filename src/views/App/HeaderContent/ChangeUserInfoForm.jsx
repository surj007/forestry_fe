import React, { Component } from 'react';
import { Form, Input } from 'antd';

class ChangeUserInfoForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({phone: window.$session.get('user').phone});
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout =  {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <Form>
        <Form.Item label="手机号" { ...formItemLayout }>
          {
            getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号' }]
            })(
              <Input placeholder="请输入手机号" />
            )
          }        
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ChangeUserInfoForm);