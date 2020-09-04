import React, { useMemo } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

import { ISummaryChartData } from './models';
import classes from './SummaryChart.css';
import { SummaryChartLegend } from './SummaryChartLegend/SummaryChartLegend';

const COLORS: string[] = [
    '#91E6EE',
    '#DBE666',
];
const GRID_COLOR = '#D9E1E8';

interface ISummaryChartProps {
    data: ISummaryChartData[];
}

type Props = ISummaryChartProps;

const SummaryChart = (props: Props) => {
    const { data } = props;

    const yAxiosKeys = useMemo(() => {
        if (!data || !Array.isArray(data) || !data.length) {
            return [];
        }

        return Object.keys(data[0]).filter(key =>
            key !== nameof<ISummaryChartData>(o => o.payload) &&
            key !== nameof<ISummaryChartData>(o => o.axiosX)
        );
    }, [ data ]);

    const axisProps = {
        strokeWidth: '4px',
        stroke: GRID_COLOR,
    };

    return (
        <LineChart width={600} height={300} data={data}>
            {yAxiosKeys.map((key, index) => (
                <Line
                    key={`y-axios-${key}`}
                    dataKey={key}
                    type="linear"
                    className={classes.line}
                    stroke={COLORS[index]}
                    style={{ color: COLORS[index] }}
                />
            ))}
            <CartesianGrid
                stroke={GRID_COLOR}
                strokeWidth="2px"
                vertical={false}
            />
            <XAxis
                dataKey={nameof<ISummaryChartData>(o => o.axiosX)}
                {...axisProps}
            />
            <YAxis {...axisProps} />
            <Tooltip content={MyTooltip}/>
            <Legend content={SummaryChartLegend} />
        </LineChart>
    );
};

const MyTooltip = (props) => {
    return (
        <p>
            some
        </p>
    );
};

export { SummaryChart };
