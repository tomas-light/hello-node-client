import React from 'react';
import ReactDom from 'react-dom';

import { App } from './App';
import ReduxButton from "./HeavyComponents/redux";


const rootElement = document.getElementById('root');

ReactDom.render(
  <App
    top={[
      {
        component: <ReduxButton/>,
        onClick: event => console.log(event, 'top 2'),
      },
    ]}
    hide={{
      // left: [0],
      // top: [1],
    }}
  />,
  rootElement
);
