import { MONTH_INDEXES } from '@utils/date-time/constants';
import { INewStudiesDto, ISummaryChartPoint } from '../../models';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';
import { aggregateGroupedData, aggregateOneLine } from './aggregateOneLine';

function make(name: string, year: number, month: number, day: number): INewStudiesDto {
    return {
        name,
        startAt: date(year, month, day),
    };
}

function date(year: number, month: number, day: number) {
    return new Date(Date.UTC(year, month, day));
}

test('1 entity', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, 1, 1),
    ];

    const output: ISummaryChartPoint[] = [
        { year: 2019, monthName: 'Feb', entityAmount: 1, newEntityNames: [ 'study 1' ] },
    ];

    const result = aggregateOneLine(input);
    expect(result).toStrictEqual(output);
});

test('3 entities, 2 month', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, 1, 1),
        make('study 2', 2019, 1, 1),
        make('study 3', 2019, 2, 1),
    ];

    const output: ISummaryChartPoint[] = [
        { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'study 1', 'study 2' ] },
        { year: 2019, monthName: 'Mar', entityAmount: 3, newEntityNames: [ 'study 3' ] },
    ];

    const result = aggregateOneLine(input);
    expect(result).toStrictEqual(output);
});

test('9 entities, 3 month', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, 1, 1),
        make('study 2', 2019, 1, 1),
        make('study 3', 2019, 2, 1),
        make('study 4', 2019, 2, 1),
        make('study 5', 2019, 1, 1),
        make('study 6', 2019, 3, 1),
        make('study 7', 2019, 3, 1),
        make('study 8', 2019, 3, 1),
        make('study 9', 2019, 3, 1),
    ];

    const output: ISummaryChartPoint[] = [
        { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
        { year: 2019, monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
        { year: 2019, monthName: 'Apr', entityAmount: 9, newEntityNames: [ 'study 6', 'study 7', 'study 8', 'study 9' ] },
    ];

    const result = aggregateOneLine(input);
    expect(result).toStrictEqual(output);
});

test('8 entities, 1 year (years joint)', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        {
            year: 2019, month: MONTH_INDEXES.November, entities: [
                { name: 'study 1', startAt: date(2019, 10, 1) },
                { name: 'study 2', startAt: date(2019, 10, 10) },
                { name: 'study 3', startAt: date(2019, 10, 20) },
            ],
        },
        {
            year: 2019, month: MONTH_INDEXES.December, entities: [
                { name: 'study 4', startAt: date(2019, 11, 1) },
                { name: 'study 5', startAt: date(2019, 11, 10) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.February, entities: [
                { name: 'study 6', startAt: date(2020, 0, 1) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.March, entities: [
                { name: 'study 7', startAt: date(2020, 1, 1) },
                { name: 'study 8', startAt: date(2020, 1, 10) },
            ],
        },
    ];

    const output: ISummaryChartPoint[] = [
        {
            year: 2019,
            monthName: 'Nov',
            entityAmount: 3,
            newEntityNames: [ 'study 1', 'study 2', 'study 3' ],
        },
        { year: 2019, monthName: 'Dec', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
        { year: 2020, monthName: 'Jan', entityAmount: 5, newEntityNames: [] },
        { year: 2020, monthName: 'Feb', entityAmount: 6, newEntityNames: [ 'study 6' ] },
        { year: 2020, monthName: 'Mar', entityAmount: 8, newEntityNames: [ 'study 7', 'study 8' ] },
    ];

    const result = aggregateGroupedData(input);
    expect(result).toStrictEqual(output);
});

test('one interval for several years', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        {
            year: 2019, month: MONTH_INDEXES.November, entities: [
                { name: 'study 1', startAt: date(2019, 10, 1) },
                { name: 'study 2', startAt: date(2019, 10, 10) },
            ],
        },
        {
            year: 2021, month: MONTH_INDEXES.January, entities: [
                { name: 'study 3', startAt: date(2022, 5, 1) },
            ],
        },
    ];

    const output: ISummaryChartPoint[] = [
        { year: 2019, monthName: 'Nov', entityAmount: 2, newEntityNames: [ 'study 1', 'study 2' ] },
        { year: 2019, monthName: 'Dec', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Jan', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Feb', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Mar', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Apr', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'May', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Jun', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Jul', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Aug', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Sep', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Oct', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Nov', entityAmount: 2, newEntityNames: [] },
        { year: 2020, monthName: 'Dec', entityAmount: 2, newEntityNames: [] },
        { year: 2021, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 3' ] },
    ];

    const result = aggregateGroupedData(input);
    expect(result).toStrictEqual(output);
});

test('14 entities, 2 years, 2 intervals', () => {
    const input: IGroupedByMonth<INewStudiesDto>[] = [
        {
            year: 2019, month: MONTH_INDEXES.November, entities: [
                { name: 'study 1', startAt: date(2019, 10, 1) },
                { name: 'study 2', startAt: date(2019, 10, 10) },
                { name: 'study 3', startAt: date(2019, 10, 20) },
            ],
        },
        {
            year: 2019, month: MONTH_INDEXES.December, entities: [
                { name: 'study 4', startAt: date(2019, 11, 1) },
                { name: 'study 5', startAt: date(2019, 11, 10) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.January, entities: [
                { name: 'study 6', startAt: date(2020, 0, 1) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.February, entities: [
                { name: 'study 7', startAt: date(2020, 1, 1) },
                { name: 'study 8', startAt: date(2020, 1, 10) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.June, entities: [
                { name: 'study 9', startAt: date(2020, 5, 1) },
                { name: 'study 10', startAt: date(2020, 5, 10) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.November, entities: [
                { name: 'study 11', startAt: date(2020, 10, 1) },
            ],
        },
        {
            year: 2020, month: MONTH_INDEXES.December, entities: [
                { name: 'study 12', startAt: date(2020, 11, 1) },
                { name: 'study 13', startAt: date(2020, 11, 2) },
                { name: 'study 14', startAt: date(2020, 11, 3) },
            ],
        },
    ];

    const output: ISummaryChartPoint[] = [
        { year: 2019, monthName: 'Nov', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        { year: 2019, monthName: 'Dec', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
        { year: 2020, monthName: 'Jan', entityAmount: 6, newEntityNames: [ 'study 6' ] },
        { year: 2020, monthName: 'Feb', entityAmount: 8, newEntityNames: [ 'study 7', 'study 8' ] },
        { year: 2020, monthName: 'Mar', entityAmount: 8, newEntityNames: [] },
        { year: 2020, monthName: 'Apr', entityAmount: 8, newEntityNames: [] },
        { year: 2020, monthName: 'May', entityAmount: 8, newEntityNames: [] },
        { year: 2020, monthName: 'Jun', entityAmount: 10, newEntityNames: [ 'study 9', 'study 10' ] },
        { year: 2020, monthName: 'Jul', entityAmount: 10, newEntityNames: [] },
        { year: 2020, monthName: 'Aug', entityAmount: 10, newEntityNames: [] },
        { year: 2020, monthName: 'Sep', entityAmount: 10, newEntityNames: [] },
        { year: 2020, monthName: 'Oct', entityAmount: 10, newEntityNames: [] },
        { year: 2020, monthName: 'Nov', entityAmount: 11, newEntityNames: [ 'study 11' ] },
        {
            year: 2020,
            monthName: 'Dec',
            entityAmount: 14,
            newEntityNames: [ 'study 12', 'study 13', 'study 14' ],
        },
    ];

    const result = aggregateGroupedData(input);
    expect(result).toStrictEqual(output);
});
