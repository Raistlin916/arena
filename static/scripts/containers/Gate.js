import React from 'react';
import { connect } from 'react-redux';

function Gate ({ userlist }) {

  return (
    <div>
      { userlist.map((item, index) => <p key={index}>{item}</p>) }
    </div>
  );
}

export default connect(
	({matching}) => matching,
)(Gate)