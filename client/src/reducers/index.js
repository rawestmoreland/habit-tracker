import { combineReducers } from 'redux'
import habitReducer from './habitReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  habit: habitReducer,
  auth: authReducer,
  error: errorReducer
})
