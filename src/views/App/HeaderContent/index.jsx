import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, message, Modal } from 'antd';

import ChangePwdForm from './ChangePwdForm';
import ChangeUserInfoForm from './ChangeUserInfoForm';
import Logo from '../../../assets/img/logo.png';

import './index.less';

class HeaderContent extends Component {
  state = {
    changePwdModal: false,
    changeUserInfoModal:  false
  }

  logout = async () => {
    await window.$service.logout();
    this.props.history.push('/login');
  }

  toggleChangePwdModal = () => {
    this.setState({changePwdModal: !this.state.changePwdModal});
  }

  toggleChangeUserInfoModal = () => {
    this.setState({changeUserInfoModal: !this.state.changeUserInfoModal});
  }

  changePwdSubmit = () => {
    this.changePwdFormRef.props.form.validateFields((err, values) => {
      if(!err) {
        if(values.newPwd != values.confirmNewPwd) {
          message.warn('两次密码输入不一致，请重新输入');
          return;
        }

        window.$http({
          url: '/admin/auth/changePwd',
          method: 'POST',
          data: {
            oldPwd: values.oldPwd,
            newPwd: values.newPwd
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('修改密码成功');
            this.toggleChangePwdModal();
          }
        });
      }
    });
  }

  changeUserInfoSubmit = () => {
    this.changeUserInfoFormRef.props.form.validateFields((err, values) => {
      if(!err) {
        window.$http({
          url: '/admin/auth/changeUserInfo',
          method: 'POST',
          data: {
            phone: values.phone
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            message.success('修改个人信息成功');
            window.$session.set('user', res.data.data);
            this.toggleChangeUserInfoModal();
          }
        });
      }
    });
  }

  render() {
    const dropMenu = (
      <Menu>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={ this.toggleChangeUserInfoModal }>&nbsp;&nbsp;修改个人信息&nbsp;&nbsp;</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={ this.toggleChangePwdModal }>&nbsp;&nbsp;修改密码&nbsp;&nbsp;</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={ this.logout }>&nbsp;&nbsp;退出&nbsp;&nbsp;</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="headerContent">
        <div style={{ height: 49, display: 'flex', alignItems: 'center' }}>
          <img src={ Logo } alt="" style={{ height: 35, width: 35 }} />

          <span style={{ marginLeft: 15, color: '#1890ff', fontWeight: 600, fontSize: 18 }}>林业有害生物检疫信息管理系统</span>
        </div>

        <div>
          <Dropdown overlay={ dropMenu }>
            <a className="ant-dropdown-link" href="javascript: void(0);">
              { window.$session.get('user').username }
              <Icon type="down" style={{ marginLeft: 5 }} />
            </a>
          </Dropdown>
        </div>

        <Modal title="修改密码" visible={ this.state.changePwdModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.changePwdSubmit } onCancel={ this.toggleChangePwdModal }>
          <ChangePwdForm wrappedComponentRef={ (form) => this.changePwdFormRef = form } />
        </Modal>

        <Modal title="修改个人信息" visible={ this.state.changeUserInfoModal } maskClosable={ false } destroyOnClose={ true }
        onOk={ this.changeUserInfoSubmit } onCancel={ this.toggleChangeUserInfoModal }>
          <ChangeUserInfoForm wrappedComponentRef={ (form) => this.changeUserInfoFormRef = form } />
        </Modal>
      </div>
    )
  }
}

export default withRouter(HeaderContent);