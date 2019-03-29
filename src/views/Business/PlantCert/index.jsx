import React, { Component } from 'react';
import { Table, message, Modal  } from 'antd';

import SearchHeader from '../components/SearchHeader';
import ImageItem from '../components/ImageItem';

import './index.less';

class PlantCert extends Component {
  state = {
    tableData: [],
    imageModal: false,
    images: [],
    timeList: [],
    locationList: []
  }

  getPlantCertList = (data) => {
    window.$http({
      url: `/admin/business/getPlantCertList`,
      method: 'GET',
      params: {
        status: data.status || '',
        companyName: data.companyName || ''
      }
    }).then((res) => {
      if (res && res.data.code === 0) {
        this.setState({tableData: res.data.data});
      }
    });
  }

  operateRecord = (item, record) => {
    switch (item) {
      case '通过': {
        if (record.picture_url) {
          this.invokePlantCert(record.id, 2);
        }
        else {
          this.invokePlantCert(record.id, 4);
        }

        break;
      }
      case '驳回': {
        this.invokePlantCert(record.id, 3);

        break;
      }
      case '查看': {
        this.setState({images: record.picture_url ? record.picture_url.split(',') : []});
        this.setState({timeList: record.picture_time ? record.picture_time.split('@') : []});
        this.setState({locationList: record.picture_location ? record.picture_location.split(',') : []});

        this.setState({imageModal: true});

        break;
      }
      default: {
        break;
      }
    }
  }

  invokePlantCert = (id, status) => {
    window.$http({
      url: `/admin/business/invokePlantCert`,
      method: 'PUT',
      data: {
        id, status
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        message.success('审核成功');
        window.$pubsub.publish('Cert_refreshCertList');
      }
    });
  }

  render() {
    const statusMap = ['', '待审核', '已通过', '未通过', '待上传照片'];
    const optMap = ['', ['查看', '通过', '驳回'], ['查看'], ['查看'], ['查看', '通过', '驳回']];

    const columns = [
      {
        title: '申请编号',
        dataIndex: 'number',
        width: 150,
        fixed: 'left'
      },
      {
        title: '企业名称',
        dataIndex: 'name'
      },
      {
        title: '植物来源（产地）',
        dataIndex: 'producing_area'
      },
      {
        title: '产品来源（加工地）',
        dataIndex: 'processing_area'
      },
      {
        title: '植物产品名称',
        dataIndex: 'plant_name'
      },
      {
        title: '品名',
        dataIndex: 'variety'
      },
      {
        title: '车船数',
        dataIndex: 'car_amount'
      },
      {
        title: '数量（m³）',
        dataIndex: 'every_car_amount'
      },
      {
        title: '包装方式',
        dataIndex: 'packaging'
      },
      {
        title: '规格',
        dataIndex: 'standard'
      },
      {
        title: '收货单位（个人）',
        dataIndex: 'receive_person'
      },
      {
        title: '收货单位详细地址',
        dataIndex: 'receive_address'
      },
      {
        title: '收货单位（个人）电话',
        dataIndex: 'phone'
      },
      {
        title: '收货联系人身份证号码',
        dataIndex: 'person_id'
      },
      {
        title: '日期',
        dataIndex: 'date_time'
      },
      {
        title: '申请人',
        dataIndex: 'apply_person'
      },
      {
        title: '承运人',
        dataIndex: 'transport_person'
      },
      {
        title: '相对应的报检单号',
        dataIndex: 'report_number'
      },
      {
        title: '车牌号',
        dataIndex: 'car_number'
      },
      {
        title: '状态',
        render: (text, record) => (
          <span>
            {
              statusMap[record.status]
            }
          </span>
        )
      },
      {
        title: '操作',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
          <span>
            {
              optMap[record.status].map((item, index) => {
                return (
                  <a 
                    key={ index }
                    style={{ marginLeft: 10 }} 
                    onClick={ 
                      () => { this.operateRecord(item, record) } 
                    }
                  >
                    { item }
                  </a>
                );
              })
            }
          </span>
        )
      }
    ];

    const pagination = {
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => (`总共 ${total} 条`)
    }

    return (
      <div className="plant-cert">
        <div style={{ marginBottom: 20 }}>
          <SearchHeader getList={ this.getPlantCertList } { ...this.props.location.params } type="plantCert" />
        </div>

        <Table 
          columns={ columns } 
          dataSource={ this.state.tableData } 
          pagination={ pagination } 
          bordered 
          rowKey={ record => record.number }
          scroll={{ x: 2700 }}
        />

        <Modal 
          title="查看" 
          visible={ this.state.imageModal } 
          maskClosable={ false }
          footer={ null }
          onCancel={ () => { this.setState({imageModal: false}) } }
        >
          <ImageItem 
            title="装车图片" 
            images={ this.state.images } 
            timeList={ this.state.timeList } 
            locationList={ this.state.locationList } 
          />
        </Modal>
      </div>
    )
  }
}

export default PlantCert;