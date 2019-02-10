import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

class App extends Component {
  componentWillMount() {
    if(!this.props.user.uid) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className="app">
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);