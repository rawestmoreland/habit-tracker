import {
  GET_HABITS,
  ADD_HABIT,
  UPDATE_HABIT,
  DELETE_HABIT,
  ITEMS_LOADING
} from '../actions/types'

const initialState = {
  habits: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HABITS:
      return {
        ...state,
        habits: action.payload,
        loading: false
      }
    case UPDATE_HABIT:
      console.log(JSON.stringify(action.payload))
      return state
    case ADD_HABIT:
      return {
        ...state,
        habits: [action.payload, ...state.habits]
      }
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(
          habit => habit._id !== action.payload
        )
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
