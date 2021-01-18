import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { Button } from './Button';
import { reducer } from './redux';

const enhancer = compose(applyMiddleware());

const reducers = combineReducers({
  someStore: reducer,
});

const store = createStore(reducers, enhancer);

const ReduxButton = () => (
  <Provider store={store}>
    <Button/>
  </Provider>
);

export { ReduxButton };
