import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//Initial State

const initialState = {
  campuses: [],
  students: []
};

//Action Types

const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';

//Action Creators

export function getStudents(students) {
  return { type: GET_STUDENTS, students };
}

export function getCampuses(campuses) {
  return { type: GET_CAMPUSES, campuses };
}

//Thunk Creators

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios
      .get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      })
      .catch(console.error);
  };
}

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios
      .get('/api/campuses')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      })
      .catch(console.error);
  };
}

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
);
