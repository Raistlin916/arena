import React from 'react';
import { connect } from 'react-redux';
import Hall from '../components/Hall';
import * as actions from '../actions';

const mapStateToProps = state => ({online: state.online});


@connect(mapStateToProps, actions)
export default class App extends React.Component {
  render() {
    return (
      <Hall {...this.props} />
    );
  }
}

