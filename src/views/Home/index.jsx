import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Statistic, Row, Col, Radio, Icon, Card } from 'antd';

import './index.less';

class Home extends Component {
  state = {
    chartOption: {
      legend: {
        data:['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '20',
        right: '20',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    },
    currentChart: '1',
    dashboardData: {
      companyCount: 0,
      companyRise: 0
    }
  }

  componentDidMount() {
    this.getDashboardData();
  }

  getDashboardData() {
    window.$http({
      url: '/admin/home/getDashboardData',
      method: 'GET'
    }).then((res) => {
      if(res && res.data.code == 0) {
        this.setState({dashboardData: res.data.data});
      }
    });
  }

  render() {
    return (
      <div className="home">
        <Row gutter={ 16 }>
          <Col span={ 6 }>
            <Card>
              <Statistic title="已注册企业数" value={ this.state.dashboardData.companyCount } />
              <Statistic value={ this.state.dashboardData.companyRise } valueStyle={{ fontSize: 12 }} prefix={ 
                <div>
                  <span>日</span>
                  <Icon type="arrow-up" />
                </div> 
              } suffix="%" />
            </Card>
          </Col>
          <Col span={ 6 }>
            <Card>
              <Statistic title="木材运输证与植物检疫申请数" value={ 112893 } />
              <Statistic value={ 112893 } valueStyle={{ fontSize: 12 }} prefix={ 
                <div>
                  <span>日</span>
                  <Icon type="arrow-up" />
                </div> 
              } suffix="%" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="原木类开证立方" value={ 112893 } suffix="m³" />
              <Statistic value={ 112893 } valueStyle={{ fontSize: 12 }} prefix={ 
                <div>
                  <span>日</span>
                  <Icon type="arrow-up" />
                </div> 
              } suffix="%" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="板材类开证立方" value={ 112893 } suffix="m³" />
              <Statistic value={ 112893 } valueStyle={{ fontSize: 12 }} prefix={ 
                <div>
                  <span>日</span>
                  <Icon type="arrow-up" />
                </div> 
              } suffix="%" />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 20 }}>
          <Radio.Group onChange={ ($event) => { this.setState({ currentChart: $event.target.value }) } } value={ this.state.currentChart } style={{ marginBottom: 20 }}>
            <Radio.Button value="1">新增企业数</Radio.Button>
            <Radio.Button value="2">原木类开证立方</Radio.Button>
            <Radio.Button value="3">板材类开证立方</Radio.Button>
            <Radio.Button value="4">新开木材运输证</Radio.Button>
            <Radio.Button value="5">通过率</Radio.Button>
            <Radio.Button value="6">平均办证时长</Radio.Button>
          </Radio.Group>

          <ReactEcharts option={ this.state.chartOption } style={{ height: 'calc(100vh - 421px)' }} />
        </Card>
      </div>
    )
  }
}

export default Home;