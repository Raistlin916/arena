import React from 'react';
import { connect } from 'react-redux';
import { startSearch } from '../actions';

function Hall ({ startSearch, onlineNum, isSearching }) {
	return (
    <div>
    	<button onClick={startSearch}>{ isSearching ? 'Searching' : 'Search'}</button>
    	<div>
    		online: {onlineNum}
    	</div>
    </div>
  );
}

export default connect(
	state => state.online,
	{ startSearch }
)(Hall);