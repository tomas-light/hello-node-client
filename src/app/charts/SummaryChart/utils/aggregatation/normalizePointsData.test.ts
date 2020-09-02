import { ISummaryChartPoint, } from '../../models';
import { normalizePointsData } from './normalizePointsData';

describe('normalize data', () => {
    test('level 1', () => {
        const input: ISummaryChartPoint[][] = [
            [
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            ],
        ];

        const output: ISummaryChartPoint[][] = [
            [
                { monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 3' ] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            ],
        ];

        expect(normalizePointsData(input)).toStrictEqual(output);
    });

    test('level 2', () => {
        const input: ISummaryChartPoint[][] = [
            [
                { monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1' ] },
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
            ],
        ];

        const output: ISummaryChartPoint[][] = [
            [
                { monthName: 'Jan', entityAmount: 3, newEntityNames: [ 'study 1' ] },
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 2', 'study 3' ] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 2, newEntityNames: [] },
            ],
        ];

        expect(normalizePointsData(input)).toStrictEqual(output);
    });

    test('level 3', () => {
        const input: ISummaryChartPoint[][] = [
            [
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
                { monthName: 'Apr', entityAmount: 6, newEntityNames: [ 'study 6' ] },
                { monthName: 'May', entityAmount: 9, newEntityNames: [ 'study 7', 'study 8', 'study 9' ] },
            ],
            [
                { monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Apr', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
            ],
        ];

        const output: ISummaryChartPoint[][] = [
            [
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
                { monthName: 'Apr', entityAmount: 6, newEntityNames: [ 'study 6' ] },
                { monthName: 'May', entityAmount: 9, newEntityNames: [ 'study 7', 'study 8', 'study 9' ] },
            ],
            [
                { monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Mar', entityAmount: 2, newEntityNames: [] },
                { monthName: 'Apr', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
                { monthName: 'May', entityAmount: 4, newEntityNames: [] },
            ],
        ];

        expect(normalizePointsData(input)).toStrictEqual(output);
    });

    test('level 4', () => {
        const input: ISummaryChartPoint[][] = [
            [
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
                {
                    monthName: 'Apr',
                    entityAmount: 9,
                    newEntityNames: [ 'study 6', 'study 7', 'study 8', 'study 9' ],
                },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
                { monthName: 'May', entityAmount: 5, newEntityNames: [ 'user 5' ] },
            ],
        ];

        const output: ISummaryChartPoint[][] = [
            [
                { monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
                {
                    monthName: 'Apr',
                    entityAmount: 9,
                    newEntityNames: [ 'study 6', 'study 7', 'study 8', 'study 9' ],
                },
                { monthName: 'May', entityAmount: 9, newEntityNames: [] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
                { monthName: 'Mar', entityAmount: 4, newEntityNames: [] },
                { monthName: 'Apr', entityAmount: 4, newEntityNames: [] },
                { monthName: 'May', entityAmount: 5, newEntityNames: [ 'user 5' ] },
            ],
        ];

        expect(normalizePointsData(input)).toStrictEqual(output);
    });

    test('level 5', () => {
        const input: ISummaryChartPoint[][] = [
            [
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
                { monthName: 'May', entityAmount: 5, newEntityNames: [ 'user 5' ] },
            ],
        ];

        const output: ISummaryChartPoint[][] = [
            [
                { monthName: 'Jan', entityAmount: 0, newEntityNames: [] },
                { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
                { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
                { monthName: 'Apr', entityAmount: 5, newEntityNames: [] },
                { monthName: 'May', entityAmount: 9, newEntityNames: [] },
            ],
            [
                { monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
                { monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
                { monthName: 'Mar', entityAmount: 4, newEntityNames: [] },
                { monthName: 'Apr', entityAmount: 4, newEntityNames: [] },
                { monthName: 'May', entityAmount: 5, newEntityNames: [ 'user 5' ] },
            ],
        ];

        expect(normalizePointsData(input)).toStrictEqual(output);
    });
});
