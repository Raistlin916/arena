import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Hall from './components/Hall'


const reducer = (state, action) => {
	return state;
}
const initialState = {
	onlineNumber: 0,
	userInfo: {
		username: 'gaok'
	}
}
const store = createStore(reducer, initialState);

ReactDom.render(
	<Provider store={store} >
		<Hall/>
	</Provider>
, document.getElementById('container'))