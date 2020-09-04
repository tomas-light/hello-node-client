import { IHaveDate } from '../models/IHaveDate';
import { IGroupedByMonth } from '../models/IGroupedByMonth';

type MapInitialEntry<TEntity> = Iterable<readonly[ number, TEntity[] ]>;

function groupModelsByMonth<TEntity extends IHaveDate>(models: TEntity[]): IGroupedByMonth<TEntity>[] {
    const groupedDataByMonth = models.reduce(
        (map, item: TEntity) => {
            const year = item.date.getUTCFullYear();
            const month = item.date.getUTCMonth();

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
                const newEntries: MapInitialEntry<TEntity> = [ [ month, [ item ] ] ];
                const monthModelMap = new Map<number, TEntity[]>(newEntries);
                map.set(year, monthModelMap);
            }
            return map;
        },
        new Map<number, Map<number, TEntity[]>>()
    );

    const grouped: IGroupedByMonth<TEntity>[] = [];
    for (const [ year, map ] of groupedDataByMonth) {
        for (const [ month, entities ] of map) {
            grouped.push({
                year,
                month,
                entities,
            });
        }
    }

    return grouped;
}

export { groupModelsByMonth };
