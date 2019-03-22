import React, { Component } from 'react';
import { Table, message  } from 'antd';

import './index.less';

class Quarantine extends Component {
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
        title: '木材品种',
        dataIndex: '3'
      },
      {
        title: '来源',
        dataIndex: '4'
      },
      {
        title: '进口报检号',
        dataIndex: '5'
      },
      {
        title: '抽检数量',
        dataIndex: '6'
      },
      {
        title: '现场检疫',
        dataIndex: '7'
      },
      {
        title: '图片',
        dataIndex: '8'
      }
    ];

    const pagination = {
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => (`总共 ${total} 条`)
    }

    return (
      <div className="quarantine">
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

export default Quarantine;