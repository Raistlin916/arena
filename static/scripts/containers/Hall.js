import React from 'react';
import { connect } from 'react-redux';
import { requestSearch } from '../actions';
import { Timer } from '../components';

function Hall ({ requestSearch, online, matching }) {
  const { isSearching } = matching
  return (
    <div>
      <button onClick={requestSearch}>{ isSearching ? 'Searching' : 'Search' }</button>
      <div>
        online: {online.onlineNum}
      </div>
      { isSearching ? <div>已搜索: <Timer/></div> : '' }
    </div>
  );
}

export default connect(
	({online, matching}) => ({online, matching}),
	{ requestSearch }
)(Hall);