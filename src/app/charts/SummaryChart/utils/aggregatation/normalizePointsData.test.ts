import { ISummaryChartPoint, } from '../../models';
import { normalizePointsData } from './normalizePointsData';

test('dont\'t change original data', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    const inputForComparing: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    normalizePointsData(input);
    expect(input).toStrictEqual(inputForComparing);
});

test('current line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('current line -> start (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2018, monthName: 'Nov', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2018, monthName: 'Dec', entityAmount: 2, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2018, monthName: 'Nov', entityAmount: 0, newEntityNames: [] },
            { year: 2018, monthName: 'Dec', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2018, monthName: 'Nov', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2018, monthName: 'Dec', entityAmount: 2, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('current line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('current line -> end (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Dec', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Dec', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Dec', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 3, newEntityNames: [] },
        ],
        [
            { year: 2019, monthName: 'Dec', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('other line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 1, newEntityNames: [ 'study 1' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 1, newEntityNames: [ 'study 1' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('other line -> start (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2018, monthName: 'Nov', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2018, monthName: 'Dec', entityAmount: 3, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2018, monthName: 'Nov', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2018, monthName: 'Dec', entityAmount: 3, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2018, monthName: 'Nov', entityAmount: 0, newEntityNames: [] },
            { year: 2018, monthName: 'Dec', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('other line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Feb', entityAmount: 2, newEntityNames: [] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('other line -> end (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Dec', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Dec', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Dec', entityAmount: 3, newEntityNames: [ 'study 1' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
        ],
        [
            { year: 2019, monthName: 'Dec', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2020, monthName: 'Jan', entityAmount: 2, newEntityNames: [] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('current line -> end; other line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2019, monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
            { year: 2019, monthName: 'Apr', entityAmount: 8, newEntityNames: [ 'study 6', 'study 7', 'study 8' ] },
        ],
        [
            { year: 2019, monthName: 'Sep', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Oct', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            { year: 2019, monthName: 'Nov', entityAmount: 5, newEntityNames: [ 'user 5' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2019, monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
            {
                year: 2019, monthName: 'Apr',
                entityAmount: 8,
                newEntityNames: [ 'study 6', 'study 7', 'study 8' ],
            },
            { year: 2019, monthName: 'May', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Jun', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Jul', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Aug', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Sep', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Oct', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Nov', entityAmount: 8, newEntityNames: [] },
        ],
        [
            { year: 2019, monthName: 'Feb', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Mar', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Apr', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'May', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jun', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jul', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Aug', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Sep', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Oct', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            { year: 2019, monthName: 'Nov', entityAmount: 5, newEntityNames: [ 'user 5' ] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});

test('current line -> start; other line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Sep', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Oct', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            { year: 2019, monthName: 'Nov', entityAmount: 5, newEntityNames: [ 'user 5' ] },
        ],
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2019, monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
            { year: 2019, monthName: 'Apr', entityAmount: 8, newEntityNames: [ 'study 6', 'study 7', 'study 8' ] },
        ],
    ];

    const output: ISummaryChartPoint[][] = [
        [
            { year: 2019, monthName: 'Feb', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Mar', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Apr', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'May', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jun', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Jul', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Aug', entityAmount: 0, newEntityNames: [] },
            { year: 2019, monthName: 'Sep', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            { year: 2019, monthName: 'Oct', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            { year: 2019, monthName: 'Nov', entityAmount: 5, newEntityNames: [ 'user 5' ] },
        ],
        [
            { year: 2019, monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            { year: 2019, monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 4', 'study 5' ] },
            {
                year: 2019, monthName: 'Apr',
                entityAmount: 8,
                newEntityNames: [ 'study 6', 'study 7', 'study 8' ],
            },
            { year: 2019, monthName: 'May', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Jun', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Jul', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Aug', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Sep', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Oct', entityAmount: 8, newEntityNames: [] },
            { year: 2019, monthName: 'Nov', entityAmount: 8, newEntityNames: [] },
        ],
    ];

    expect(normalizePointsData(input)).toStrictEqual(output);
});
