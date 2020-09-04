import React, { useMemo } from 'react';
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
        <div>
            {payload.map((item: RealLegendPayload) => (
                <p key={`legend-${item.dataKey}`}>
                    {item.value}
                </p>
            ))}
        </div>
    );
};

export { SummaryChartLegend };
