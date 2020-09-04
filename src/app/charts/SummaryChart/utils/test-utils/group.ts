import { INewStudiesDto } from '../../models';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';
import { make } from './make';

/*
example of returns
{
    year: 2020, month: MONTH_INDEXES.March, entities: [
        { name: 'study 7', date: date(2020, MONTH_INDEXES.February, 1) },
        { name: 'study 8', date: date(2020, MONTH_INDEXES.February, 10) },
    ],
},
*/
function group(year: number, month: number, names: string[]): IGroupedByMonth<INewStudiesDto> {
    return {
        year,
        month,
        entities: names.map(name => make(name, year, month)),
    };
}

export { group };
