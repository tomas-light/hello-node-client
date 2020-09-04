import React, { useMemo } from 'react';

import { MONTH_INDEXES } from '@utils/date-time/constants';
import { INewStudiesDto } from './models';
import { SummaryChartOptions } from './models/chart/summary/SummaryChartOptions';
import { SummaryChart } from './SummaryChart';
import { aggregateDataForChart } from './utils/aggregatation';

function make(name: string, year: number, month: number): INewStudiesDto {
    return {
        name,
        date: new Date(Date.UTC(year, month, 1)),
    };
}

const SummaryChartContainer = () => {
    const summaryChartData = useMemo(() => {
        const studies: INewStudiesDto[] = [
            make('study 1', 2019, MONTH_INDEXES.February),
            make('study 2', 2019, MONTH_INDEXES.February),
            make('study 3', 2019, MONTH_INDEXES.February),
            make('study 4', 2019, MONTH_INDEXES.March),
            make('study 5', 2019, MONTH_INDEXES.March),
            make('study 6', 2019, MONTH_INDEXES.April),
            make('study 7', 2019, MONTH_INDEXES.April),
            make('study 8', 2019, MONTH_INDEXES.April),
            make('study 9', 2019, MONTH_INDEXES.April),
        ];

        const users: INewStudiesDto[] = [
            make('User 1', 2020, MONTH_INDEXES.September),
            make('User 2', 2020, MONTH_INDEXES.September),
            make('User 3', 2020, MONTH_INDEXES.October),
            make('User 4', 2020, MONTH_INDEXES.November),
            make('User 5', 2020, MONTH_INDEXES.November),
        ];

        return aggregateDataForChart({
            studies,
            users,
        }, new SummaryChartOptions());
    }, []);

    return (
        <SummaryChart
            data={summaryChartData}
        />
    );
};

export { SummaryChartContainer };
