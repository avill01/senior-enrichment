import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentEntity from './currentEntity';
import students from './students';
import campuses from './campuses';
import edit from './edit';

const reducer = combineReducers({
  currentEntity,
  students,
  campuses,
  edit
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
);

export default store;

export * from './currentEntity';
export * from './students';
export * from './campuses';
export * from './edit';
