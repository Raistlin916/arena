import React from 'react';

export default class Hall extends React.Component {
  render() {
    return (
      <div>
      	<button onClick={()=>this.props.startSearch()}>Search</button>
      	<div>
      		online: {this.props.online.onlineNum}
      	</div>
      </div>
    );
  }
}
