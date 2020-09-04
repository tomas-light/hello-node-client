import React from 'react';
import { LegendPayload, LegendProps } from 'recharts';

import classes from './SummaryChartLegend.css';

interface RealLegendPayload extends LegendPayload {
    dataKey: string;
    inactive: boolean;
}

interface RealLegendProps extends LegendProps {
    payload: RealLegendPayload[];
}

type Props = RealLegendProps;

const SummaryChartLegend = (props: Props) => {
    const { payload } = props;

    return (
        <div className={classes.container}>
            {payload.map((item: RealLegendPayload) => (
                <div key={`legend-item-${item.value}`} className={classes['legend-item']}>
                    <div className={classes['color-square']} style={{ backgroundColor: item.color }}/>

                    <p className={classes.label}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export { SummaryChartLegend };
