import { ONLINE_NUMBER_CHANGE } from '../constants'

const initialState = {
  onlineNum: 0
}

export default (state = initialState, action) => {
  const { type } = action

  if (type === ONLINE_NUMBER_CHANGE) {
    return { ...state, ...{ onlineNum: action.payload.number } }
  }

  return state
}

