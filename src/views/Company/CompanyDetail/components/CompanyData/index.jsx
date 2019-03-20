import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import PropTypes from 'prop-types';

import './index.less';

class CompanyData extends Component {
  render() {
    return (
      <div className="company-data">
        <Form layout="inline">
          <Form.Item style={{ marginLeft: 8 }}>
            <span style={{ fontWeight: 700 }}>基础资料</span>
          </Form.Item>
          <div style={{ marginLeft: 24 }}>
            <Row>
              <Col span={ 12 }>
                <Form.Item label="企业法人">
                  { this.props.company.corporation }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="原料来源">
                  { this.props.company.source }
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={ 12 }>
                <Form.Item label="统一社会信用代码">
                  { this.props.company.code }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="仓储地点">
                  { this.props.company.store }
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={ 12 }>
                <Form.Item label="联系电话">
                  { this.props.company.phone }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="（木材）原料主要产品">
                  { this.props.company.kind }
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={ 12 }>
                <Form.Item label="企业地址">
                  { this.props.company.address }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="企业类型">
                  { this.props.company.companyType }
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col span={ 12 }>
                <Form.Item label="营业执照">
                  <img src={ this.props.company.licencePic } alt="" className="img" onClick={ () => { window.open(this.props.company.licencePic) } } />
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="法人身份证">
                  <img src={ this.props.company.cardFrontPic } alt="" className="img" onClick={ () => { window.open(this.props.company.licencePic) } } />
                  <img src={ this.props.company.cardOppositePic } alt="" className="img" style={{ marginLeft: 30 }} onClick={ () => { window.open(this.props.company.licencePic) } } />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 30 }}>
              <Col span={ 12 }>
                <Form.Item label="告知书">
                  <img src={ this.props.company.notificationPic } alt="" className="img" onClick={ () => { window.open(this.props.company.licencePic) } } />
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="承诺书">
                  <img src={ this.props.company.commitPic } alt="" className="img" onClick={ () => { window.open(this.props.company.licencePic) } } />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Form.Item style={{ marginLeft: 8, marginTop: 20 }}>
            <span style={{ fontWeight: 700 }}>生产销售相关</span>
          </Form.Item>
          <div style={{ marginLeft: 24 }}>
            <Row>
              <Col span={ 12 }>
                <Form.Item label="企业生产能力">
                  { `${this.props.company.saw}套台锯，${this.props.company.sawOutput}m³` }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="月销售量">
                  { this.props.company.saleMount }
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={ 12 }>
                <Form.Item label="主要产品">
                  { this.props.company.product }
                </Form.Item>
              </Col>

              <Col span={ 12 }>
                <Form.Item label="主要销售区域">
                  { this.props.company.saleArea }
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Form.Item style={{ marginLeft: 8, marginTop: 8 }}>
            <span style={{ fontWeight: 700 }}>开证业务员</span>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

CompanyData.propTypes = {
  company: PropTypes.object.isRequired,
  employee: PropTypes.array.isRequired
};

export default Form.create()(CompanyData);