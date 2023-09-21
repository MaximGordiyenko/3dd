import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { productsReducer } from "./reducers/products.reducer.js";

// import { monitorReducerEnhancer } from './enhancers/monitorReducers';
import logger from './middleware/logger';

const reducers = combineReducers({
  productsReducer,
});

export const configureStore = (preloadedState) => {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  
  const enhancers = [middlewareEnhancer, /*monitorReducerEnhancer*/];
  const composedEnhancers = compose(...enhancers);
  
  return createStore(reducers, preloadedState, composedEnhancers);
};
