import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  }

  state = {
    
  }

  render() {
    return (
      <div className="image-item">
        <span>{ this.props.title }</span>

        <div style={{ marginTop: 15, marginBottom: 15, display: 'flex', flexWrap: 'wrap' }}>
          {
            this.props.images.map((item, index) => {
              return (
                <img 
                  src={ item } 
                  alt="" 
                  key={ index } 
                  style={{ height: 100, width: 100, marginLeft: 10, flex: '0 0 auto' }}
                  onClick={ () => { window.open(item) } } 
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ImageItem;