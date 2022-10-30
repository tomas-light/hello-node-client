import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

// Найти элемент в дереве с аттрибутом id равным 'root'
// этот элемент описан в файле /public/index.html
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);