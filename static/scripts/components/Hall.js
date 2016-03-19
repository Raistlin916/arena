import React from 'react';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
      	<button onClick={()=>this.props.onlineIncrement(5)}>Search</button>
      	<div>
      		online: {this.props.online.onlineNum}
      	</div>
      </div>
    );
  }
}
