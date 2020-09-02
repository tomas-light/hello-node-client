import { getMonthName } from '@utils/date-time/getMonthName';
import { INewStudiesDto } from '../models';

function groupModelsByMonth(models: INewStudiesDto[]): Map<string, string[]> {
    const groupedDataByMonth = models.reduce((map, item: INewStudiesDto) => {
        const monthName = getMonthName(item.startAt, 3);
        if (map.has(monthName)) {
            map.get(monthName).push(item.name);
        }
        else {
            map.set(monthName, [ item.name ]);
        }
        return map;
    }, new Map());

    return groupedDataByMonth;
}

export { groupModelsByMonth };
