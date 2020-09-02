import React, { useMemo } from 'react';

import { aggregateDataForChart } from './utils/aggregatation';
import { INewStudiesDto } from './models';
import { SummaryChart } from './SummaryChart';

function make(name: string, year: number, month: number, day: number): INewStudiesDto {
    return {
        name,
        startAt: new Date(Date.UTC(year, month, day)),
    };
}

const SummaryChartContainer = () => {
    const summaryChartData = useMemo(() => {
        const studies: INewStudiesDto[] = [
            make('study 1', 2019, 2, 1),
            make('study 2', 2019, 2, 1),
            make('study 3', 2019, 3, 1),
            make('study 4', 2019, 3, 1),
            make('study 5', 2019, 2, 1),
            make('study 6', 2019, 4, 1),
            make('study 7', 2019, 4, 1),
            make('study 8', 2019, 4, 1),
            make('study 9', 2019, 4, 1),
        ];

        const users: INewStudiesDto[] = [
            make('User 1', 2019, 1, 1),
            make('User 2', 2019, 1, 1),
            make('User 3', 2019, 2, 1),
            make('User 4', 2019, 2, 1),
        ];

        return aggregateDataForChart({
            studies,
            users,
        });
    }, []);

    return (
        <SummaryChart
            data={summaryChartData}
        />
    );
};

export { SummaryChartContainer };
