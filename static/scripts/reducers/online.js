import { ONLINE_NUMBER_CHANGE } from '../actions';

const initialState = {
	onlineNum: 0
};

export default (state = initialState, action) => {
	const { type } = action;
	
	if (type == ONLINE_NUMBER_CHANGE) {
		return { ...state, ...{ onlineNum: state.onlineNum + action.number }};
	}

	return state;
}

