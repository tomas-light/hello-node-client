import { MONTH_INDEXES } from '@utils/date-time/constants';
import { INewStudiesDto } from '../models';
import { IGroupedByMonth } from '../models/IGroupedByMonth';
import { groupModelsByMonth } from './groupModelsByMonth';
import { group, make } from './test-utils';

test('group data', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, MONTH_INDEXES.November),
        make('study 2', 2019, MONTH_INDEXES.November),
        make('study 3', 2019, MONTH_INDEXES.November),
        make('study 4', 2019, MONTH_INDEXES.December),
        make('study 5', 2019, MONTH_INDEXES.December),
        make('study 6', 2020, MONTH_INDEXES.January),
        make('study 7', 2020, MONTH_INDEXES.February),
        make('study 8', 2020, MONTH_INDEXES.February),
    ];

    const output: IGroupedByMonth<INewStudiesDto>[] = [
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
    ];

    const result = groupModelsByMonth(input);
    expect(result).toStrictEqual(output);
});
