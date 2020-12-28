import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import { getReducers, logicMiddleware } from './redux';
import { getWatchers } from './redux/getWatchers';

function configureApp() {
  const composer = getComposer();
  const reducers = makeReducers();

  const middleware = makeMiddleware();
  const enhancer = composer(middleware);

  const store = createStore(reducers, enhancer);

  return {
    store,
  };
}

function getComposer() {
  if (process.env.NODE_ENV !== 'development') {
    return compose;
  }

  const devtoolsComposer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
  if (devtoolsComposer) {
    return devtoolsComposer;
  }

  return compose;
}

function makeMiddleware() {
  const watchers = getWatchers();
  const middleware = applyMiddleware(
    logicMiddleware(watchers)
  );
  return middleware;
}

function makeReducers() {
  const reducers = getReducers();
  const rootReducer = combineReducers(reducers);
  return rootReducer;
}

export { configureApp };
