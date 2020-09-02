import {
    IAggregatedData,
    INewStudiesDto,
    ISummaryChartData,
} from '../../models';
import { aggregateMultipleLine } from './aggregateMultipleLine';

describe('aggregation tests', () => {
    function make(name: string, year: number, month: number, day: number): INewStudiesDto {
        return {
            name,
            startAt: new Date(Date.UTC(year, month, day)),
        };
    }

    describe('normalized data', () => {
        test('level 1', () => {
            const input: IAggregatedData<INewStudiesDto> = {
                studies: [
                    make('study 1', 2019, 2, 1),
                    make('study 2', 2019, 2, 1),
                    make('study 3', 2019, 3, 10),
                ],
                users: [
                    make('User 1', 2019, 2, 1),
                    make('User 2', 2019, 2, 1),
                    make('User 3', 2019, 2, 1),
                    make('User 4', 2019, 3, 10),
                    make('User 5', 2019, 3, 10),
                ],
            };

            const output: ISummaryChartData[] = [
                {
                    axiosX: 'Mar',
                    studies: 2,
                    users: 3,
                },
                {
                    axiosX: 'Apr',
                    studies: 3,
                    users: 5,
                },
            ];

            expect(aggregateMultipleLine(input)).toStrictEqual(output);
        });

        test('level 2', () => {
            const input: IAggregatedData<INewStudiesDto> = {
                studies: [
                    make('study 1', 2019, 2, 1),
                    make('study 2', 2019, 2, 1),
                    make('study 3', 2019, 3, 1),
                    make('study 4', 2019, 3, 1),
                    make('study 5', 2019, 2, 1),
                    make('study 6', 2019, 4, 1),
                    make('study 7', 2019, 4, 1),
                    make('study 8', 2019, 4, 1),
                    make('study 9', 2019, 4, 1),
                ],
                users: [
                    make('User 3', 2019, 2, 1),
                    make('User 4', 2019, 2, 1),
                    make('User 4', 2019, 3, 10),
                    make('User 5', 2019, 3, 10),
                    make('User 6', 2019, 4, 10),
                ],
            };

            const output: ISummaryChartData[] = [
                {
                    axiosX: 'Mar',
                    studies: 3,
                    users: 2,
                },
                {
                    axiosX: 'Apr',
                    studies: 5,
                    users: 4,
                },
                {
                    axiosX: 'May',
                    studies: 9,
                    users: 5,
                },
            ];

            expect(aggregateMultipleLine(input)).toStrictEqual(output);
        });
    });

    describe('full test', () => {
        test('level 1', () => {
            const input: IAggregatedData<INewStudiesDto> = {
                studies: [
                    make('study 1', 2019, 2, 1),
                    make('study 2', 2019, 2, 1),
                    make('study 3', 2019, 3, 10),
                ],
                users: [
                    make('User 1', 2019, 1, 1),
                    make('User 2', 2019, 1, 1),
                    make('User 1', 2019, 2, 1),
                    make('User 2', 2019, 2, 1),
                    make('User 3', 2019, 2, 1),
                    make('User 4', 2019, 3, 10),
                    make('User 5', 2019, 3, 10),
                ],
            };

            const output: ISummaryChartData[] = [
                {
                    axiosX: 'Feb',
                    studies: 0,
                    users: 2,
                },
                {
                    axiosX: 'Mar',
                    studies: 2,
                    users: 5,
                },
                {
                    axiosX: 'Apr',
                    studies: 3,
                    users: 7,
                },
            ];

            expect(aggregateMultipleLine(input)).toStrictEqual(output);
        });
    });
});
