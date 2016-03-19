import React from 'react';
import { connect } from 'react-redux';
import { startSearch } from '../actions';

function Hall ({ startSearch, onlineNum }) {
	return (
    <div>
    	<button onClick={startSearch}>Search</button>
    	<div>
    		online: {onlineNum}
    	</div>
    </div>
  );
}

export default connect(
	state => ({ onlineNum: state.online.onlineNum }),
	{ startSearch }
)(Hall);