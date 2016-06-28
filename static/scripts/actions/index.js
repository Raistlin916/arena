import { ONLINE_NUMBER_CHANGE, START_SEARCH, STOP_SEARCH, RESET_USERLIST } from '../constants'
import { push } from 'react-router-redux'

export const changeOnlineNum = number => {
  return {
    type: ONLINE_NUMBER_CHANGE,
    payload: { number }
  };
};

export const startSearch = () => {
  return {
    type: START_SEARCH
  }
}

export const stopSearch = () => {
  return {
    type: STOP_SEARCH
  }
}

export const resetUserList = () => {
  return {
    type: RESET_USERLIST,
    payload: {
      userlist: ['李狗蛋', '宋钟基', '麦当劳']
    }
  }
}

export const requestSearch = () =>
  (dispatch) => {
    dispatch(startSearch());

    setTimeout(()=> {
      dispatch(stopSearch())
      dispatch(push('/gate'))
      dispatch(resetUserList())
    }, 3000)
  }