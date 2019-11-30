import axios from 'axios'
import {
  GET_HABITS,
  ADD_HABIT,
  DELETE_HABIT,
  ITEMS_LOADING
} from './types'

export const getHabits = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('/api/habits')
    .then(res =>
      dispatch({
        type: GET_HABITS,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}
