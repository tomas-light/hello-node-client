import React from 'react';

import { ChartsContainer } from './charts/Charts.container';
import classes from './App.css';

const App = () => (
    <div className={classes.page}>
        <ChartsContainer/>
    </div>
);

export { App };
