import React, { Component } from 'react';
import { Row, Col, Form, Tabs, Tag } from 'antd';

import CompanyData from './components/CompanyData';

import './index.less';

class CompanyDetail extends Component {
  state = {
    company: {},
    certAmount: {
      boardCertAmount: {amount: 0},
      woodCertAmount: {amount: 0}
    },
    employee: []
  }

  componentDidMount() {
    this.getCompany();
    this.getCertAmount();
    this.getEmployee();
  }

  getCompany() {
    window.$http({
      url: '/admin/company/getCompanyById',
      method: 'GET',
      params: {
        id: window.$querystring.parse(this.props.location.search.slice(1)).id
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({company: res.data.data});
      }
    });
  }

  getCertAmount() {
    window.$http({
      url: '/admin/company/getCertAmountById',
      method: 'GET',
      params: {
        id: window.$querystring.parse(this.props.location.search.slice(1)).id
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({certAmount: res.data.data});
      }
    });
  }

  getEmployee() {
    window.$http({
      url: '/admin/company/getEmployeeById',
      method: 'GET',
      params: {
        id: window.$querystring.parse(this.props.location.search.slice(1)).id
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({employee: res.data.data});
      }
    });
  }

  render() {
    const status = ['', '待审核', '已注册', '未通过', '已注销'];
    const statusColor = ['', '#108ee9', '#87d068', '#f50', '#eee'];

    return (
      <div className="company-info">
        <div className="company-info-header">
          <Form layout="inline">
            <Row gutter={ 16 }>
              <Col span={ 10 }>
                <Form.Item label="公司名称">
                  { this.state.company.name }
                  <Tag color={ statusColor[this.state.company.status] } style={{ marginLeft: 24 }}>{ status[this.state.company.status] }</Tag>
                </Form.Item>
              </Col>

              <Col span={ 7 }>
                <Form.Item label="信用代码">
                  { this.state.company.code }
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={ 16 }>
              <Col span={ 10 }>
                <Form.Item label="可用原木量">
                  { this.state.certAmount.woodCertAmount.amount + 'm³' }
                </Form.Item>
              </Col>

              <Col span={ 7 }>
                <Form.Item label="可用板材量">
                  { this.state.certAmount.boardCertAmount.amount + 'm³' }
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="企业信息" key="1">
            <CompanyData company={ this.state.company } employee={ this.state.employee } />
          </Tabs.TabPane>
          <Tabs.TabPane tab="开证信息" key="2"></Tabs.TabPane>
          <Tabs.TabPane tab="木材运输证与植物检疫申请" key="3"></Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Form.create()(CompanyDetail);