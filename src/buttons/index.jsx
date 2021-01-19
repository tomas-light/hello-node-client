import React from 'react';
import ReactDom from 'react-dom';

import { ReduxButton } from './HeavyComponents/redux';
import { App } from './App';

const rootElement = document.getElementById('root');

ReactDom.render(
  <App
    top={[
      [],
      [{
        Component: () => <ReduxButton />,
      }],
    ]}
  />,
  rootElement
);
