import { INewStudiesDto, ISummaryChartPoint } from '../../models';
import { aggregateOneLine } from './aggregateOneLine';

describe('aggregation one line', () => {
    function make(name: string, year: number, month: number, day: number): INewStudiesDto {
        return {
            name,
            startAt: new Date(Date.UTC(year, month, day)),
        };
    }

    test('level 1', () => {
        const input: INewStudiesDto[] = [
            make('study 1', 2019, 1, 1),
        ];

        const output: ISummaryChartPoint[] = [
            { monthName: 'Feb', entityAmount: 1, newEntityNames: [ 'study 1' ] },
        ];

        const result = aggregateOneLine(input);
        expect(result).toStrictEqual(output);
    });

    test('level 2', () => {
        const input: INewStudiesDto[] = [
            make('study 1', 2019, 1, 1),
            make('study 2', 2019, 1, 1),
            make('study 3', 2019, 2, 1),
        ];

        const output: ISummaryChartPoint[] = [
            { monthName: 'Feb', entityAmount: 2, newEntityNames: [ 'study 1', 'study 2' ] },
            { monthName: 'Mar', entityAmount: 3, newEntityNames: [ 'study 3' ] },
        ];

        const result = aggregateOneLine(input);
        expect(result).toStrictEqual(output);
    });

    test('level 3', () => {
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
            { monthName: 'Feb', entityAmount: 3, newEntityNames: [ 'study 1', 'study 2', 'study 5' ] },
            { monthName: 'Mar', entityAmount: 5, newEntityNames: [ 'study 3', 'study 4' ] },
            { monthName: 'Apr', entityAmount: 9, newEntityNames: [ 'study 6', 'study 7', 'study 8', 'study 9' ] },
        ];

        const result = aggregateOneLine(input);
        expect(result).toStrictEqual(output);
    });
});
