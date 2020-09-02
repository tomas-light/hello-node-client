import React, { useMemo } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ISummaryChartData } from './models';

const COLORS: string[] = [
    '#91E6EE',
    '#DBE666',
];

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

        return Object.keys(data[0]).filter(
            key => key !== nameof<ISummaryChartData>(o => o.axiosX)
        );
    }, [ data ]);

    return (
        <LineChart width={600} height={300} data={data}>
            {yAxiosKeys.map((key, index) => (
                <Line
                    key={`y-axios-${key}`}
                    dataKey={key}
                    type="monotone"
                    stroke={COLORS[index]}
                />
            ))}
            <CartesianGrid
                stroke="#ccc"
                vertical={false}
            />
            <XAxis dataKey={nameof<ISummaryChartData>(o => o.axiosX)}/>
            <YAxis/>
        </LineChart>
    );
};

export { SummaryChart };
