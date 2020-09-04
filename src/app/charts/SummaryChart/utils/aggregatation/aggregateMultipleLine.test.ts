import { MONTH_INDEXES } from '@utils/date-time/constants';
import { IAggregated, INewStudiesDto, ISummaryChartData, } from '../../models';
import { SummaryChartOptions } from '../../models/chart/summary/SummaryChartOptions';
import { aggregateMultipleLine } from './aggregateMultipleLine';
import { make, pushToSummaryChartData as push } from '../test-utils';

test('level 1', () => {
    const input: IAggregated<INewStudiesDto> = {
        studies: [
            make('study 1', 2019, MONTH_INDEXES.March),
            make('study 2', 2019, MONTH_INDEXES.March),
            make('study 3', 2019, MONTH_INDEXES.April),
        ],
        users: [
            make('User 1', 2019, MONTH_INDEXES.March),
            make('User 2', 2019, MONTH_INDEXES.March),
            make('User 3', 2019, MONTH_INDEXES.March),
            make('User 4', 2019, MONTH_INDEXES.April),
            make('User 5', 2019, MONTH_INDEXES.April),
        ],
    };

    const output: ISummaryChartData[] = [];
    push(output, 2019, 'Mar', {
        studies: [ 'study 1', 'study 2' ],
        users: [ 'User 1', 'User 2', 'User 3' ],
    });
    push(output, 2019, 'Apr', {
        studies: [ 'study 3' ],
        users: [ 'User 4', 'User 5' ],
    });

    const result = aggregateMultipleLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('level 2', () => {
    const input: IAggregated<INewStudiesDto> = {
        studies: [
            make('study 1', 2019, MONTH_INDEXES.March),
            make('study 2', 2019, MONTH_INDEXES.March),
            make('study 3', 2019, MONTH_INDEXES.April),
            make('study 4', 2019, MONTH_INDEXES.April),
            make('study 5', 2019, MONTH_INDEXES.March),
            make('study 6', 2019, MONTH_INDEXES.May),
            make('study 7', 2019, MONTH_INDEXES.May),
            make('study 8', 2019, MONTH_INDEXES.May),
            make('study 9', 2019, MONTH_INDEXES.May),
        ],
        users: [
            make('User 1', 2019, MONTH_INDEXES.March),
            make('User 2', 2019, MONTH_INDEXES.March),
            make('User 3', 2019, MONTH_INDEXES.April),
            make('User 4', 2019, MONTH_INDEXES.April),
            make('User 5', 2019, MONTH_INDEXES.May),
        ],
    };

    const output: ISummaryChartData[] = [];
    push(output, 2019, 'Mar', {
        studies: [ 'study 1', 'study 2', 'study 5' ],
        users: [ 'User 1', 'User 2' ],
    });
    push(output, 2019, 'Apr', {
        studies: [ 'study 3', 'study 4' ],
        users: [ 'User 3', 'User 4' ],
    });
    push(output, 2019, 'May', {
        studies: [ 'study 6', 'study 7', 'study 8', 'study 9' ],
        users: [ 'User 5' ],
    });

    const result = aggregateMultipleLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('level 3', () => {
    const input: IAggregated<INewStudiesDto> = {
        studies: [
            make('study 1', 2019, MONTH_INDEXES.November),
            make('study 2', 2019, MONTH_INDEXES.November),
            make('study 3', 2019, MONTH_INDEXES.December),
            make('study 4', 2020, MONTH_INDEXES.March),
            make('study 5', 2020, MONTH_INDEXES.March),
        ],
        users: [
            make('User 1', 2020, MONTH_INDEXES.May),
            make('User 2', 2020, MONTH_INDEXES.May),
            make('User 3', 2020, MONTH_INDEXES.May),
            make('User 4', 2020, MONTH_INDEXES.June),
            make('User 5', 2020, MONTH_INDEXES.June),
        ],
    };

    const output: ISummaryChartData[] = [];
    push(output, 2019, 'Nov', {
        studies: [ 'study 1', 'study 2' ],
        users: [],
    });
    push(output, 2019, 'Dec', {
        studies: [ 'study 3' ],
    });
    push(output, 2020, 'Jan');
    push(output, 2020, 'Feb');
    push(output, 2020, 'Mar', {
        studies: [ 'study 4', 'study 5' ],
    });
    push(output, 2020, 'Apr');
    push(output, 2020, 'May', {
        users: [ 'User 1', 'User 2', 'User 3' ],
    });
    push(output, 2020, 'Jun', {
        users: [ 'User 4', 'User 5' ],
    });

    const result = aggregateMultipleLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});

test('level 4', () => {
    const input: IAggregated<INewStudiesDto> = {
        studies: [
            make('study 1', 2019, MONTH_INDEXES.April),
            make('study 2', 2019, MONTH_INDEXES.April),
            make('study 3', 2019, MONTH_INDEXES.May),
            make('study 4', 2020, MONTH_INDEXES.May),
        ],
        users: [
            make('User 1', 2020, MONTH_INDEXES.May),
            make('User 2', 2020, MONTH_INDEXES.May),
            make('User 3', 2020, MONTH_INDEXES.May),
            make('User 4', 2020, MONTH_INDEXES.June),
            make('User 5', 2020, MONTH_INDEXES.June),
        ],
    };

    const output: ISummaryChartData[] = [];
    push(output, 2019, 'Apr', {
        studies: [ 'study 1', 'study 2' ],
        users: [],
    });
    push(output, 2019, 'May', {
        studies: [ 'study 3' ],
    });
    push(output, 2019, 'Jun');
    push(output, 2019, 'Jul');
    push(output, 2019, 'Aug');
    push(output, 2019, 'Sep');
    push(output, 2019, 'Oct');
    push(output, 2019, 'Nov');
    push(output, 2019, 'Dec');
    push(output, 2020, 'Jan');
    push(output, 2020, 'Feb');
    push(output, 2020, 'Mar');
    push(output, 2020, 'Apr');
    push(output, 2020, 'May', {
        studies: [ 'study 4' ],
        users: [ 'User 1', 'User 2', 'User 3' ],
    });
    push(output, 2020, 'Jun', {
        users: [ 'User 4', 'User 5' ],
    });

    const result = aggregateMultipleLine(input, new SummaryChartOptions());
    expect(result).toStrictEqual(output);
});
