import { INewStudiesDto } from '../models';
import { IGroupedByMonth } from '../models/IGroupedByMonth';

function groupModelsByMonth(models: INewStudiesDto[]): IGroupedByMonth<INewStudiesDto>[] {
    const groupedDataByMonth = models.reduce((map, item: INewStudiesDto) => {
        const year = item.startAt.getUTCFullYear();
        const month = item.startAt.getUTCMonth();

        if (map.has(year)) {
            const monthMap = map.get(year);
            if (monthMap.has(month)) {
                monthMap.get(month).push(item);
            }
            else {
                monthMap.set(month, [ item ]);
            }
        }
        else {
            const newEntries: Iterable<readonly[ number, INewStudiesDto[] ]> = [ [ month, [ item ] ] ];
            const monthModelMap = new Map<number, INewStudiesDto[]>(newEntries);
            map.set(year, monthModelMap);
        }
        return map;
    }, new Map<number, Map<number, INewStudiesDto[]>>());

    const grouped: IGroupedByMonth<INewStudiesDto>[] = [];
    for (const [ year, map ] of groupedDataByMonth) {
        for (const [ month, studies ] of map) {
            grouped.push({
                year,
                month,
                entities: studies,
            });
        }
    }

    return grouped;
}

export { groupModelsByMonth };
