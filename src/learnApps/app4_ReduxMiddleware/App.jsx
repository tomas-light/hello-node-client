import React from 'react';
import { Provider } from 'react-redux';

import { configureApp } from './config/configureApp';
import { UserPageContainer } from './UserPage';

const { store } = configureApp();

const App = () => (
  <Provider store={store}>
    <div>
      <UserPageContainer/>
    </div>
  </Provider>
);

export { App };
