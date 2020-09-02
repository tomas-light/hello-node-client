import React from 'react';
import ReactDom from 'react-dom';

import { App } from './app';

const rootElement = document.getElementById('root');

ReactDom.render(
    <App/>,
    rootElement
);
