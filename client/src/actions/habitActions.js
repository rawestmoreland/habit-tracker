import axios from 'axios'
import {
  GET_HABITS,
  ADD_HABIT,
  UPDATE_HABIT,
  DELETE_HABIT,
  ITEMS_LOADING
} from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

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

export const addHabit = habit => (dispatch, getState) => {
  axios
    .post('/api/habits', habit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_HABIT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const deleteHabit = id => (dispatch, getState) => {
  axios
    .delete(`/api/habits/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_HABIT,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const updateHabit = habit => (dispatch, getState) => {
  axios
    .put(`/api/habits/${habit.id}`, habit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_HABIT,
        payload: habit
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const setItemsLoading = () => {
  return { type: ITEMS_LOADING }
}
