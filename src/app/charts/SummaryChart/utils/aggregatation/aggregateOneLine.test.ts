import { MONTH_INDEXES } from '@utils/date-time/constants';
import { INewStudiesDto, ISummaryChartPoint } from '../../models';
import { SummaryChartOptions } from '../../models/chart/summary/SummaryChartOptions';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';
import { aggregateGroupedData, aggregateOneLine } from './aggregateOneLine';
import { make, group, pushToSummaryChartPoint as push } from '../test-utils';

test('1 entity', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, MONTH_INDEXES.February),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Feb', [ 'study 1' ]);

    const result = aggregateOneLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('3 entities, 2 month', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, MONTH_INDEXES.February),
        make('study 2', 2019, MONTH_INDEXES.February),
        make('study 3', 2019, MONTH_INDEXES.March),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Feb', [ 'study 1', 'study 2' ]);
    push(output, 2019, 'Mar', [ 'study 3' ]);

    const result = aggregateOneLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('9 entities, 3 month', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, MONTH_INDEXES.February),
        make('study 2', 2019, MONTH_INDEXES.February),
        make('study 3', 2019, MONTH_INDEXES.March),
        make('study 4', 2019, MONTH_INDEXES.March),
        make('study 5', 2019, MONTH_INDEXES.February),
        make('study 6', 2019, MONTH_INDEXES.April),
        make('study 7', 2019, MONTH_INDEXES.April),
        make('study 8', 2019, MONTH_INDEXES.April),
        make('study 9', 2019, MONTH_INDEXES.April),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Feb', [ 'study 1', 'study 2', 'study 5' ]);
    push(output, 2019, 'Mar', [ 'study 3', 'study 4' ]);
    push(output, 2019, 'Apr', [ 'study 6', 'study 7', 'study 8', 'study 9' ]);

    const result = aggregateOneLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('8 entities, 1 year (years joint)', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        group(2019, MONTH_INDEXES.November, [
            'study 1', 'study 2', 'study 3',
        ]),
        group(2019, MONTH_INDEXES.December, [
            'study 4', 'study 5',
        ]),
        group(2020, MONTH_INDEXES.February, [
            'study 6',
        ]),
        group(2020, MONTH_INDEXES.March, [
            'study 7', 'study 8',
        ]),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Nov', [ 'study 1', 'study 2', 'study 3' ]);
    push(output, 2019, 'Dec', [ 'study 4', 'study 5' ]);
    push(output, 2020, 'Jan');
    push(output, 2020, 'Feb', [ 'study 6' ]);
    push(output, 2020, 'Mar', [ 'study 7', 'study 8' ]);

    const result = aggregateGroupedData(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('one interval for several years', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        group(2019, MONTH_INDEXES.November, [
            'study 1', 'study 2',
        ]),
        group(2021, MONTH_INDEXES.January, [
            'study 3',
        ]),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Nov', [ 'study 1', 'study 2' ]);
    push(output, 2019, 'Dec');
    push(output, 2020, 'Jan');
    push(output, 2020, 'Feb');
    push(output, 2020, 'Mar');
    push(output, 2020, 'Apr');
    push(output, 2020, 'May');
    push(output, 2020, 'Jun');
    push(output, 2020, 'Jul');
    push(output, 2020, 'Aug');
    push(output, 2020, 'Sep');
    push(output, 2020, 'Oct');
    push(output, 2020, 'Nov');
    push(output, 2020, 'Dec');
    push(output, 2021, 'Jan', [ 'study 3' ]);

    const result = aggregateGroupedData(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('14 entities, 2 years, 2 intervals', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        group(2019, MONTH_INDEXES.November, [
            'study 1', 'study 2', 'study 3',
        ]),
        group(2019, MONTH_INDEXES.December, [
            'study 4', 'study 5',
        ]),
        group(2020, MONTH_INDEXES.January, [
            'study 6',
        ]),
        group(2020, MONTH_INDEXES.February, [
            'study 7', 'study 8',
        ]),
        group(2020, MONTH_INDEXES.June, [
            'study 9', 'study 10',
        ]),
        group(2020, MONTH_INDEXES.November, [
            'study 11',
        ]),
        group(2020, MONTH_INDEXES.December, [
            'study 12', 'study 13', 'study 14',
        ]),
    ];

    const output: ISummaryChartPoint[] = [];
    push(output, 2019, 'Nov', [ 'study 1', 'study 2', 'study 3' ]);
    push(output, 2019, 'Dec', [ 'study 4', 'study 5' ]);
    push(output, 2020, 'Jan', [ 'study 6' ]);
    push(output, 2020, 'Feb', [ 'study 7', 'study 8' ]);
    push(output, 2020, 'Mar');
    push(output, 2020, 'Apr');
    push(output, 2020, 'May');
    push(output, 2020, 'Jun', [ 'study 9', 'study 10' ]);
    push(output, 2020, 'Jul');
    push(output, 2020, 'Aug');
    push(output, 2020, 'Sep');
    push(output, 2020, 'Oct');
    push(output, 2020, 'Nov', [ 'study 11' ]);
    push(output, 2020, 'Dec', [ 'study 12', 'study 13', 'study 14' ]);

    const result = aggregateGroupedData(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});
