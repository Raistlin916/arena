import React from 'react';

export default class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	second: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
  	this.startAt = Date.now()
  	this.tid = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
  	clearInterval(this.tid)
  }

  render() {
    return (
      <span>{this.state.second}</span>
    );
  }

  tick() {
  	const now = Date.now()
  	const second = parseInt((now - this.startAt)/1000)
  	this.setState({
  		second: second
  	})
  }
}
