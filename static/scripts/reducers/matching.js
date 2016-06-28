import { START_SEARCH, STOP_SEARCH, RESET_USERLIST } from '../constants';

const initialState = {
  isSearching: false,
  userlist: []
};

export default (state = initialState, action) => {
  const { type } = action;

  if (type === START_SEARCH) {
    return { ...state, ...{ isSearching: true } }
  }

  if (type === STOP_SEARCH) {
    return { ...state, ...{ isSearching: false } }
  }

  if (type === RESET_USERLIST) {
    return { ...state, ...{ userlist: action.payload.userlist } }
  }

  return state;
}

