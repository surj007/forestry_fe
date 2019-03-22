import React, { Component } from 'react';
import { Table, message  } from 'antd';

import SearchHeader from '../components/SearchHeader';
import ImageList from '../components/ImageList';

import './index.less';

class Cert extends Component {
  state = {
    tableData: []
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

  operateRecord = (item, type, id) => {
    switch (item + type) {
      case '通过原木类开证': {
        this.invokeCert(id, 'wood_cert', 2);
        break;
      }
      case '通过板材类开证': {
        this.invokeCert(id, 'board_cert', 2);
        break;
      }
      case '驳回原木类开证': {
        this.invokeCert(id, 'wood_cert', 3);
        break;
      }
      case '驳回板材类开证': {
        this.invokeCert(id, 'board_cert', 3);
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
                      () => { this.operateRecord(item, record.cert_type, record.id) } 
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

        <ImageList />
      </div>
    )
  }
}

export default Cert;