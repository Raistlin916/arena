import React, { Component } from 'react';
import UserInfo from './UserInfo';
import { connect } from 'react-redux';

@connect(state=>state)
export default class Hall extends Component {

	constructor (props) {
		super(props)
	}

	render () {
		return <div>
				<UserInfo userInfo={this.props.userInfo}/>
				<button>search</button>
				<p>online: {this.props.onlineNumber}</p>
			</div>
	}
}

