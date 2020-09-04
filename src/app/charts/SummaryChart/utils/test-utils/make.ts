import { INewStudiesDto } from '../../models';
import { date } from './date';

function make(name: string, year: number, month: number, day: number = 1): INewStudiesDto {
    return {
        name,
        date: date(year, month, day),
    };
}

export { make };
