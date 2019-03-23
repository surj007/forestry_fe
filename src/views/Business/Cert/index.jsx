import React, { Component } from 'react';
import { Table, message, Modal } from 'antd';

import SearchHeader from '../components/SearchHeader';
import ImageItem from '../components/ImageItem';

import './index.less';

class Cert extends Component {
  state = {
    tableData: [],
    imageModal: false,
    imageList: [
      {
        title: '',
        images: []
      }
    ]
  }

  getCertList = (data) => {
    window.$http({
      url: `/admin/business/getCertList`,
      method: 'GET',
      params: {
        certType: data.certType || '',
        status: data.status || '',
        companyName: data.companyName || ''
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({tableData: res.data.data});
      }
    });
  }

  operateRecord = (item, type, record) => {
    switch (item + type) {
      case '通过原木类开证': {
        this.invokeCert(record.id, 'wood_cert', 2);

        break;
      }
      case '通过板材类开证': {
        this.invokeCert(record.id, 'board_cert', 2);

        break;
      }
      case '驳回原木类开证': {
        this.invokeCert(record.id, 'wood_cert', 3);

        break;
      }
      case '驳回板材类开证': {
        this.invokeCert(record.id, 'board_cert', 3);

        break;
      }
      case '查看板材类开证': {
        let imageList = [
          {
            title: '1.通关无纸化放行通知单',
            images: record.noticePic.split(',')
          },
          {
            title: '2.中华人民共和国海关进口货物报关单',
            images: record.declarationPic.split(',')
          },
          {
            title: '3.合同或销售证明',
            images: record.contractPic.split(',')
          }
        ];
        this.setState({imageList});

        this.setState({imageModal: true});

        break;
      }
      case '查看原木类开证': {
        let imageList = [
          {
            title: '1.太仓出入境检验检疫局进境散装木材准运通知单',
            images: record.noticePic.split(',')
          },
          {
            title: '2.进口小提单',
            images: record.ladingPic.split(',')
          },
          {
            title: '3.中华人民共和国海关进口货物报关单',
            images: record.declarationPic.split(',')
          }
        ];
        this.setState({imageList});

        this.setState({imageModal: true});

        break;
      }
      default: {
        break;
      }
    }
  }

  invokeCert = (id, table, status) => {
    window.$http({
      url: `/admin/business/invokeCert`,
      method: 'PUT',
      data: {
        id, table, status
      }
    }).then((res) => {
      if(res && res.data.code == 0) {
        message.success('审核成功');
        window.$pubsub.publish('Cert_refreshCertList');
      }
    });
  }

  render() {
    const statusMap = ['', '待审核', '已通过', '未通过'];
    const optMap = ['', ['查看', '通过', '驳回'], ['查看'], ['查看']];

    const columns = [
      {
        title: '开证单编号',
        dataIndex: 'number'
      },
      {
        title: '开证类型',
        dataIndex: 'cert_type'
      },
      {
        title: '开证量（m³）',
        dataIndex: 'amount'
      },
      {
        title: '开证时间',
        dataIndex: 'create_time'
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
        render: (text, record) => (
          <span>
            {
              optMap[record.status].map((item, index) => {
                return (
                  <a 
                    key={ index }
                    style={{ marginLeft: 10 }} 
                    onClick={ 
                      () => { this.operateRecord(item, record.cert_type, record) } 
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
      <div className="cert">
        <div style={{ marginBottom: 20 }}>
          <SearchHeader getList={ this.getCertList } { ...this.props.location.params } />
        </div>

        <Table 
          columns={ columns } 
          dataSource={ this.state.tableData } 
          pagination={ pagination } 
          bordered 
          rowKey={ record => record.number }
        />

        <Modal 
          title="查看" 
          visible={ this.state.imageModal } 
          maskClosable={ false }
          footer={ null }
          onCancel={ () => { this.setState({imageModal: false}) } }
        >
          {
            this.state.imageList.map((item, index) => {
              return <ImageItem title={ item.title } images={ item.images } key={ index } />
            })
          }
        </Modal>
      </div>
    )
  }
}

export default Cert;