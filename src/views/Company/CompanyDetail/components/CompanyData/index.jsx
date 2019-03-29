import React, { Component } from 'react';
import { 
  Row, 
  Col, 
  Form, 
  Radio,
  Select,
  Input,
  Button,
  message,
  Modal
} from 'antd';
import PropTypes from 'prop-types';

import './index.less';

class CompanyData extends Component {
  state= {
    imageModal: false,
    imageSrc: ''
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.$http({
          url: '/admin/company/approveCompany',
          method: 'PUT',
          data: {
            id: this.props.company.id,
            status: values.status,
            refuse_reason: (values.refuse_reason && values.refuse_reason.toString()) || '',
            remark: values.remark
          }
        }).then((res) => {
          if(res && res.data.code === 0) {
            message.success('审核成功');
            this.props.updateCompany();
          }
        });
      }
    });
  }

  setImageModalData = (imageSrc) => {
    this.setState({imageModal: true});
    this.setState({imageSrc});
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="company-data">
        <Form layout="inline">
          <div>
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
                    <img src={ this.props.company.licencePic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.company.licencePic) } } />
                  </Form.Item>
                </Col>

                <Col span={ 12 }>
                  <Form.Item label="法人身份证">
                    <img src={ this.props.company.cardFrontPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.company.licencePic) } } />
                    <img src={ this.props.company.cardOppositePic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.company.licencePic) } } />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: 30 }}>
                <Col span={ 12 }>
                  <Form.Item label="告知书">
                    <img src={ this.props.company.notificationPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.company.licencePic) } } />
                  </Form.Item>
                </Col>

                <Col span={ 12 }>
                  <Form.Item label="承诺书">
                    <img src={ this.props.company.commitPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.company.licencePic) } } />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div>
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
          </div>

          <div>
            <Form.Item style={{ marginLeft: 8, marginTop: 8 }}>
              <span style={{ fontWeight: 700 }}>开证业务员</span>
            </Form.Item>
            <div style={{ marginLeft: 24 }}>
              <Row>
                <Col span={ 12 }>
                  <Form.Item label="业务员1">
                    { this.props.employee[0] && this.props.employee[0].name }
                  </Form.Item>
                </Col>

                <Col span={ 12 }>
                  <Form.Item label="业务员2">
                    { this.props.employee[1] && this.props.employee[1].name }
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={ 12 }>
                  <Form.Item label="联系电话">
                    { this.props.employee[0] && this.props.employee[0].username }
                  </Form.Item>
                </Col>

                <Col span={ 12 }>
                  <Form.Item label="联系电话">
                    { this.props.employee[1] && this.props.employee[1].username }
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: 20 }}>
                <Col span={ 12 }>
                  <Form.Item label="附件">
                    <img src={ this.props.employee[0] && this.props.employee[0].socialSecurityPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[0] && this.props.employee[0].socialSecurityPic) } } />
                    <img src={ this.props.employee[0] && this.props.employee[0].cardFrontPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[0] && this.props.employee[0].cardFrontPic) } } />
                    <img src={ this.props.employee[0] && this.props.employee[0].cardOppositePic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[0] && this.props.employee[0].cardOppositePic) } } />
                  </Form.Item>
                </Col>

                <Col span={ 12 }>
                  <Form.Item label="附件">
                    <img src={ this.props.employee[1] && this.props.employee[1].socialSecurityPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[1] && this.props.employee[1].socialSecurityPic) } } />
                    <img src={ this.props.employee[1] && this.props.employee[1].cardFrontPic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[1] && this.props.employee[1].cardFrontPic) } } />
                    <img src={ this.props.employee[1] && this.props.employee[1].cardOppositePic } alt="" className="img" onClick={ () => { this.setImageModalData(this.props.employee[1] && this.props.employee[1].cardOppositePic) } } />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          { this.props.company.status !== 1 ? null : (
            <div>
              <Form.Item style={{ marginLeft: 8, marginTop: 8 }}>
                <span style={{ fontWeight: 700 }}>审核</span>
              </Form.Item>
              <div style={{ marginLeft: 24 }}>
                <Row>
                  <Form.Item label="审核结果: " style={{ marginLeft: 53 }}>
                    { getFieldDecorator('status', {
                      initialValue: 3
                    })(
                      <Radio.Group>
                        <Radio value={ 2 }>通过</Radio>
                        <Radio value={ 3 }>不通过</Radio>
                      </Radio.Group>
                    ) }
                  </Form.Item>
                </Row>

                { this.props.form.getFieldValue('status') === 2 ? null : (
                  <Row>
                    <Form.Item label="审核不通过原因: ">
                      { getFieldDecorator('refuse_reason', {
                        rules: [{ required: true, message: '请输入审核不通过原因' }]
                      })(
                        <Select mode="multiple" style={{ width: 300 }}>
                          {
                            this.props.refuseReason.map((item, index) => (
                              <Select.Option key={ `${index + 1}、${item}` }>
                                { item }
                              </Select.Option>
                            ))
                          }
                        </Select>
                      ) }
                    </Form.Item>
                  </Row>
                ) }

                <Row>
                  <Form.Item label="备注: " style={{ marginTop: 15, marginLeft: 80 }}>
                    { getFieldDecorator('remark', {
                      rules: [{ max: 200, message: '备注不能超过200个字' }]
                    })(
                      <Input.TextArea rows={4} style={{ width: 300 }} />
                    ) }
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item style={{ marginTop: 5, marginLeft: 360 }}>
                    <Button type="primary" onClick={ this.submit }>提交</Button>
                  </Form.Item>
                </Row>
              </div>
            </div>
          ) }
        </Form>

        <Modal 
          title="查看图片" 
          visible={ this.state.imageModal } 
          footer={ null }
          onCancel={ () => { this.setState({imageModal: false}) } }
        >
          <img src={ this.state.imageSrc } alt="" className="img_modal" />
        </Modal>
      </div>
    )
  }
}

CompanyData.propTypes = {
  company: PropTypes.object.isRequired,
  employee: PropTypes.array.isRequired,
  refuseReason: PropTypes.array.isRequired,
  updateCompany: PropTypes.func.isRequired
};

export default Form.create()(CompanyData);