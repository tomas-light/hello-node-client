import { INewStudiesDto } from '../models';
import { IGroupedByMonth } from '../models/IGroupedByMonth';
import { groupModelsByMonth } from './groupModelsByMonth';

function make(name: string, year: number, month: number, day: number): INewStudiesDto {
    return {
        name,
        startAt: date(year, month, day),
    };
}

function date(year: number, month: number, day: number) {
    return new Date(Date.UTC(year, month, day));
}

test('group data', () => {
    const input: INewStudiesDto[] = [
        make('study 1', 2019, 10, 1),
        make('study 2', 2019, 10, 10),
        make('study 3', 2019, 10, 20),
        make('study 4', 2019, 11, 1),
        make('study 5', 2019, 11, 10),
        make('study 6', 2020, 0, 1),
        make('study 7', 2020, 1, 1),
        make('study 8', 2020, 1, 10),
    ];

    const output: IGroupedByMonth<INewStudiesDto>[] = [
        {
            year: 2019, month: 10, entities: [
                { name: 'study 1', startAt: date(2019, 10, 1) },
                { name: 'study 2', startAt: date(2019, 10, 10) },
                { name: 'study 3', startAt: date(2019, 10, 20) },
            ],
        },
        {
            year: 2019, month: 11, entities: [
                { name: 'study 4', startAt: date(2019, 11, 1) },
                { name: 'study 5', startAt: date(2019, 11, 10) },
            ],
        },
        {
            year: 2020, month: 0, entities: [
                { name: 'study 6', startAt: date(2020, 0, 1) },
            ],
        },
        {
            year: 2020, month: 1, entities: [
                { name: 'study 7', startAt: date(2020, 1, 1) },
                { name: 'study 8', startAt: date(2020, 1, 10) },
            ],
        },
    ];

    const result = groupModelsByMonth(input);
    expect(result).toStrictEqual(output);
});
