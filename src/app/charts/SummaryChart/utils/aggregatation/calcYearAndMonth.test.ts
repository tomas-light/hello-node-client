import { MONTH_INDEXES } from '@utils/date-time/constants';
import { calcYearAndMonth } from './calcYearAndMonth';

describe('month calculation', () => {
    describe('inner year intervals', () => {
        test('start', () => {
            const result = calcYearAndMonth(
                {
                    year: 2019,
                    month: MONTH_INDEXES.March,
                    entities: [],
                }, 2);

            const output = [ 2019, MONTH_INDEXES.January ];
            expect(result).toStrictEqual(output);
        });

        test('middle', () => {
            const result = calcYearAndMonth(
                {
                    year: 2019,
                    month: MONTH_INDEXES.September,
                    entities: [],
                }, 7);

            const output = [ 2019, MONTH_INDEXES.February ];
            expect(result).toStrictEqual(output);
        });

        test('end', () => {
            const result = calcYearAndMonth(
                {
                    year: 2019,
                    month: MONTH_INDEXES.December,
                    entities: [],
                }, 5);

            const output = [ 2019, MONTH_INDEXES.July ];
            expect(result).toStrictEqual(output);
        });

        test('entire', () => {
            const result = calcYearAndMonth(
                {
                    year: 2019,
                    month: MONTH_INDEXES.December,
                    entities: [],
                }, 11);

            const output = [ 2019, MONTH_INDEXES.January ];
            expect(result).toStrictEqual(output);
        });
    });

    describe('transition between one year', () => {
        test('close joint', () => {
            const result = calcYearAndMonth(
                {
                    year: 2020,
                    month: MONTH_INDEXES.January,
                    entities: [],
                }, 1);

            const output = [ 2019, MONTH_INDEXES.December ];
            expect(result).toStrictEqual(output);
        });

        test('a few months', () => {
            const result = calcYearAndMonth(
                {
                    year: 2020,
                    month: MONTH_INDEXES.February,
                    entities: [],
                }, 3);

            const output = [ 2019, MONTH_INDEXES.November ];
            expect(result).toStrictEqual(output);
        });

        test('full year', () => {
            const result = calcYearAndMonth(
                {
                    year: 2020,
                    month: MONTH_INDEXES.December,
                    entities: [],
                },
                12
            );

            const output = [ 2019, MONTH_INDEXES.December ];
            expect(result).toStrictEqual(output);
        });

        test('June 2020 -> September 2019', () => {
            const result = calcYearAndMonth(
                {
                    year: 2020,
                    month: MONTH_INDEXES.June,
                    entities: [],
                }, 9);

            const output = [ 2019, MONTH_INDEXES.September ];
            expect(result).toStrictEqual(output);
        });

        test('greater than one year', () => {
            const result = calcYearAndMonth(
                {
                    year: 2020,
                    month: MONTH_INDEXES.August,
                    entities: [],
                }, 19);

            const output = [ 2019, MONTH_INDEXES.January ];
            expect(result).toStrictEqual(output);
        });
    });

    test('big interval', () => {
        const result = calcYearAndMonth(
            {
                year: 2021,
                month: MONTH_INDEXES.June,
                entities: [],
            }, 19);

        const output = [ 2019, MONTH_INDEXES.November ];
        expect(result).toStrictEqual(output);
    });
});
