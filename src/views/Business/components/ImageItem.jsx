import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';


class ImageItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    timeList: PropTypes.array,
    locationList: PropTypes.array
  }

  state = {
    imageDetailModal: false,
    imageSrc: ''
  }

  setImageModalData = (imageSrc) => {
    this.setState({imageDetailModal: true});
    this.setState({imageSrc});
  }

  render() {
    return (
      <div className="image-item">
        <span>{ this.props.title }</span>

        <div style={{ marginTop: 15, marginBottom: 15, display: 'flex', flexWrap: 'wrap' }}>
          {
            this.props.images.map((item, index) => {
              return (
                <div key={ index } style={{ marginRight: 15 }}>
                  <img 
                    src={ item } 
                    alt="" 
                    style={{ height: 100, width: 100, marginLeft: 10, flex: '0 0 auto' }}
                    onClick={ () => { this.setImageModalData(item) } } 
                  />
                  <p>{ this.props.timeList && this.props.timeList[index] }</p>
                  <p>{ this.props.timeList && this.props.locationList[index] }</p>
                </div>
              )
            })
          }
        </div>

        <Modal 
          title="查看图片" 
          visible={ this.state.imageDetailModal } 
          footer={ null }
          onCancel={ () => { this.setState({imageDetailModal: false}) } }
        >
          <img src={ this.state.imageSrc } alt="" className="img_modal" />
        </Modal>
      </div>
    )
  }
}

export default ImageItem;