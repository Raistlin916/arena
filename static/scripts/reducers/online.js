import { ONLINE_NUMBER_CHANGE, START_SEARCH } from '../actions';

const initialState = {
	onlineNum: 0,
	isSearching: false
};

export default (state = initialState, action) => {
	const { type } = action;
	
	if (type == ONLINE_NUMBER_CHANGE) {
		return { ...state, ...{ onlineNum: state.onlineNum + action.number }};
	}

	if (type == START_SEARCH) {
		return { ...state, ...{ isSearching: true}};
	}

	return state;
}

