import React, { Component } from 'react';
import { Table, message  } from 'antd';

import './index.less';

class Check extends Component {
  state = {
    tableData: []
  }

  componentDidMount() {

  }

  render() {
    const columns = [
      {
        title: '企业名称',
        dataIndex: '1'
      },
      {
        title: '检查日期',
        dataIndex: '2'
      },
      {
        title: '检查人数',
        dataIndex: '3'
      },
      {
        title: '仓储地点',
        dataIndex: '4'
      },
      {
        title: '台锯数',
        dataIndex: '5'
      },
      {
        title: '检查地点',
        dataIndex: '6'
      },
      {
        title: '车辆数量',
        dataIndex: '7'
      },
      {
        title: '车牌',
        dataIndex: '8'
      },
      {
        title: '图片',
        dataIndex: '9'
      },
      {
        title: '备注',
        dataIndex: '10'
      }
    ];

    const pagination = {
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => (`总共 ${total} 条`)
    }

    return (
      <div className="check">
        <Table 
          columns={ columns } 
          dataSource={ this.state.tableData } 
          pagination={ pagination } 
          bordered 
          rowKey={ record => record.id }
        />
      </div>
    )
  }
}

export default Check;