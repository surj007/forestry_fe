import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Form,
  Select,
  Input,
  Button
} from 'antd';

class SearchHeader extends Component {
  static propTypes = {
    getList: PropTypes.func.isRequired,
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    companyName: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps  = {
    status: '',
    companyName: '',
    type: 'cert'
  }

  state = {
    
  }

  componentDidMount () {
    this.props.getList(this.props.form.getFieldsValue());
    window.$pubsub.subscribe('Cert_refreshCertList', () => {
      this.props.getList(this.props.form.getFieldsValue());
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="search-header">
        <Form layout="inline">
          {
            this.props.type === 'plantCert' ? null : (
              <Form.Item label="开证类型">
                { 
                  getFieldDecorator('certType', {
                    initialValue: ''
                  })(
                    <Select style={{ width: 170 }}>
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="板材类开证">板材类开证</Select.Option>
                      <Select.Option value="原木类开证">原木类开证</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            )
          }

          <Form.Item label="状态">
            {
              getFieldDecorator('status', {
                initialValue: this.props.status
              })(
                <Select style={{ width: 170 }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value={ 1 }>待审核</Select.Option>
                  <Select.Option value={ 2 }>已通过</Select.Option>
                  <Select.Option value={ 3 }>未通过</Select.Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="企业名称">
            {
              getFieldDecorator('companyName', {
                initialValue: this.props.companyName
              })(
                <Input style={{ width: 170 }} />
              )
            }
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={
                () => { this.props.getList(this.props.form.getFieldsValue()) }
              }
            >
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(SearchHeader);