import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';
import {authentication} from './features/authentication';
import {carService} from './features/carService';

const logger = createLogger({
  diff: true,
  collapsed: true
})

const combineReducer = combineReducers({authentication, carService})

export const store = createStore(combineReducer,applyMiddleware(thunk, logger))