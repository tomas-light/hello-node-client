import React from 'react';

import classes from './Charts.css';
import { SummaryChartContainer } from './SummaryChart/SummaryChart.container';

const Charts = () => {
    return (
        <div className={classes.container}>
            <div className={classes.charts}>
                <SummaryChartContainer/>
            </div>

            <img className={classes.task} src="/img/chart-tasks.png"/>
        </div>
    );
};

export { Charts };
