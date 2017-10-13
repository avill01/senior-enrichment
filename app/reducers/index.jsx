import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
import campusReducer from './campusReducer';

const initialState = {};

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer,
  studentReducer,
  campusReducer
});
