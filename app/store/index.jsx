import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import students from './students';
import campuses from './campuses';

const reducer = combineReducers({
  students,
  campuses
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
);

export default store;
export * from './students';
export * from './campuses';
