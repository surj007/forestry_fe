import React, { Component } from 'react';
import { Row, Col, Form, Tabs, Tag, Button } from 'antd';

import CompanyData from './components/CompanyData';

import './index.less';

class CompanyDetail extends Component {
  state = {
    company: {},
    certAmount: {
      boardCertAmount: {amount: 0},
      woodCertAmount: {amount: 0}
    },
    employee: [],
    basicInfo: {
      '审核不通过原因': {
        info: []
      }
    }
  }

  componentDidMount() {
    this.getBasicInfo('审核不通过原因');
    this.getCompany();
    this.getCertAmount();
    this.getEmployee();
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
        this.setState({basicInfo: res.data.data});
      }
    });
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
      url: '/admin/company/getEmployeeByCompnayId',
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

  skipNewPath = (path) => {
    this.props.history.push({
      pathname : `/app/business/${path}`,
      params: {
        status: 2,
        companyName: this.state.company.name
      }
    });
  }

  render() {
    const status = ['', '待审核', '已注册', '未通过', '已注销'];
    const statusColor = ['', '#108ee9', '#87d068', '#f50', '#eee'];

    return (
      <div className="company-detail">
        <div>
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

            <Form.Item>
              <Button 
                type="primary" 
                onClick={ () => { this.skipNewPath('cert') } }
              >
                查看企业开证信息
              </Button>

              <Button 
                type="primary" 
                onClick={ () => { this.skipNewPath('plantCert') } }
                style={{ marginLeft: 15 }}
              >
                查看企业木材运输证与植物检疫申请
              </Button>

              <Button 
                type="primary" 
                onClick={ () => { this.props.history.push('/app/company/companyInfo') } }
                style={{ marginLeft: 15 }}
              >
                返回
              </Button>
            </Form.Item>
          </Form>
        </div>

        <CompanyData 
          company={ this.state.company } 
          employee={ this.state.employee } 
          refuseReason={ this.state.basicInfo['审核不通过原因'].info }
          updateCompany={ this.getCompany.bind(this) }
        />
      </div>
    )
  }
}

export default Form.create()(CompanyDetail);