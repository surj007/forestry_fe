import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import actions from '../../store/actions/index-actions';

import './index.less';

class Login extends Component {
  componentWillMount() {
    if(this.props.user.uid) {
      this.props.history.push('/');
    }
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.props.login(values, () => {
          this.props.getMenu(() => {
            window.sessionStorage.setItem('login', 'true');
            this.props.history.push('/');
          })
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <div className="login-content">
          <h1 className="login-title">后台管理系统</h1>

          <Form className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }]
                })(
                  <Input size="large" prefix={ <Icon type="user" /> } 
                  placeholder="请输入用户名" />
                )
              }        
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input size="large" prefix={ <Icon type="lock" /> } 
                  type="password" placeholder="请输入密码" />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button block type="primary" size="large" onClick={ this.submit }>登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login: actions.login, 
  getMenu: actions.getMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));