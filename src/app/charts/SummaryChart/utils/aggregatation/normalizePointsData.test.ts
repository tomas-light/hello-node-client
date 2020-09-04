import { ISummaryChartPoint, } from '../../models';
import { SummaryChartOptions } from '../../models/chart/summary/SummaryChartOptions';
import { normalizePointsData } from './normalizePointsData';
import { makeSummaryChartPointArray as makeArray } from '../test-utils';

test('dont\'t change original data', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const inputForComparing: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(input).toStrictEqual(inputForComparing);
});

test('current line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('current line -> start (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2018, 'Nov', [ 'user 1', 'user 2' ])
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2018, 'Nov')
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2018, 'Nov', [ 'user 1', 'user 2' ])
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('current line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Jan', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Jan', [ 'study 1', 'study 2', 'study 3' ])
            .push(2019, 'Feb')
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('current line -> end (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Dec', [ 'study 1', 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Dec', [ 'user 1', 'user 2' ])
            .push(2020, 'Jan', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Dec', [ 'study 1', 'study 2', 'study 3' ])
            .push(2020, 'Jan')
            .build(),
        makeArray()
            .push(2019, 'Dec', [ 'user 1', 'user 2' ])
            .push(2020, 'Jan', [ 'user 3', 'user 4' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('other line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Jan', [ 'study 1' ])
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Feb', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Jan', [ 'study 1' ])
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('other line -> start (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2018, 'Nov', [ 'study 1' ])
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Feb', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2018, 'Nov', [ 'study 1' ])
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2018, 'Nov')
            .push(2018, 'Dec')
            .push(2019, 'Jan')
            .push(2019, 'Feb', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('other line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2018, 'Jan', [ 'study 1' ])
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2018, 'Jan', [ 'study 1' ])
            .push(2019, 'Feb', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Jan', [ 'user 1', 'user 2' ])
            .push(2019, 'Feb')
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('other line -> end (different year)', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Dec', [ 'study 1' ])
            .push(2020, 'Jan', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Dec', [ 'user 1', 'user 2' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Dec', [ 'study 1' ])
            .push(2020, 'Jan', [ 'study 2', 'study 3' ])
            .build(),
        makeArray()
            .push(2019, 'Dec', [ 'user 1', 'user 2' ])
            .push(2020, 'Jan')
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('current line -> end; other line -> start', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .push(2019, 'Mar', [ 'study 4', 'study 5' ])
            .push(2019, 'Apr', [ 'study 6', 'study 7', 'study 8' ])
            .build(),
        makeArray()
            .push(2019, 'Sep', [ 'user 1', 'user 2' ])
            .push(2019, 'Oct', [ 'user 3', 'user 4' ])
            .push(2019, 'Nov', [ 'user 5' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .push(2019, 'Mar', [ 'study 4', 'study 5' ])
            .push(2019, 'Apr', [ 'study 6', 'study 7', 'study 8' ])
            .push(2019, 'May')
            .push(2019, 'Jun')
            .push(2019, 'Jul')
            .push(2019, 'Aug')
            .push(2019, 'Sep')
            .push(2019, 'Oct')
            .push(2019, 'Nov')
            .build(),
        makeArray()
            .push(2019, 'Feb')
            .push(2019, 'Mar')
            .push(2019, 'Apr')
            .push(2019, 'May')
            .push(2019, 'Jun')
            .push(2019, 'Jul')
            .push(2019, 'Aug')
            .push(2019, 'Sep', [ 'user 1', 'user 2' ])
            .push(2019, 'Oct', [ 'user 3', 'user 4' ])
            .push(2019, 'Nov', [ 'user 5' ])
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});

test('current line -> start; other line -> end', () => {
    const input: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Sep', [ 'user 1', 'user 2' ])
            .push(2019, 'Oct', [ 'user 3', 'user 4' ])
            .push(2019, 'Nov', [ 'user 5' ])
            .build(),
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .push(2019, 'Mar', [ 'study 4', 'study 5' ])
            .push(2019, 'Apr', [ 'study 6', 'study 7', 'study 8' ])
            .build(),
    ];

    const output: ISummaryChartPoint[][] = [
        makeArray()
            .push(2019, 'Feb')
            .push(2019, 'Mar')
            .push(2019, 'Apr')
            .push(2019, 'May')
            .push(2019, 'Jun')
            .push(2019, 'Jul')
            .push(2019, 'Aug')
            .push(2019, 'Sep', [ 'user 1', 'user 2' ])
            .push(2019, 'Oct', [ 'user 3', 'user 4' ])
            .push(2019, 'Nov', [ 'user 5' ])
            .build(),
        makeArray()
            .push(2019, 'Feb', [ 'study 1', 'study 2', 'study 3' ])
            .push(2019, 'Mar', [ 'study 4', 'study 5' ])
            .push(2019, 'Apr', [ 'study 6', 'study 7', 'study 8' ])
            .push(2019, 'May')
            .push(2019, 'Jun')
            .push(2019, 'Jul')
            .push(2019, 'Aug')
            .push(2019, 'Sep')
            .push(2019, 'Oct')
            .push(2019, 'Nov')
            .build(),
    ];

    const result = normalizePointsData(input, new SummaryChartOptions().lineNormalizationOptions);
    expect(result).toStrictEqual(output);
});
