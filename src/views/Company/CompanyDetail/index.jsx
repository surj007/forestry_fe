import React, { Component } from 'react';
import { Row, Col, Form, Tabs, Tag } from 'antd';

import CompanyData from './components/CompanyData';

import './index.less';

class CompanyDetail extends Component {
  state = {
    company: {}
  }

  componentWillMount() {
    this.getCompany();
  }

  getCompany() {
    window.$http({
      url: '/admin/company/getCompanyById',
      method: 'GET',
      params: {
        id: window.$querystring.parse(this.props.location.search.slice(1, this.props.location.search.length)).id
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({company: res.data.data});
      }
    });
  }

  render() {
    return (
      <div className="company-info">
        <div className="company-info-header">
          <Form layout="inline">
            <Row gutter={ 16 }>
              <Col span={ 10 }>
                <Form.Item label="公司名称">
                  { this.state.company.name }
                  <Tag color="#87d068" style={{ marginLeft: 24 }}>green</Tag>
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
                  12345m³
                </Form.Item>
              </Col>

              <Col span={ 7 }>
                <Form.Item label="可用板材量">
                  12345m³
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="企业信息" key="1">
            <CompanyData company={ this.state.company } />
          </Tabs.TabPane>
          <Tabs.TabPane tab="开证信息" key="2"></Tabs.TabPane>
          <Tabs.TabPane tab="木材运输证与植物检疫申请" key="3"></Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Form.create()(CompanyDetail);