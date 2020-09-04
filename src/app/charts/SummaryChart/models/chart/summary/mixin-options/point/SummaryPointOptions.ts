import { getMonthName } from '@utils/date-time/getMonthName';
import { IGroupedByMonth } from '../../../../IGroupedByMonth';
import { INewStudiesDto } from '../../../../INewStudiesDto';
import { ISummaryChartPoint } from '../../ISummaryChartPoint';
import { ISummaryPointOptions } from './ISummaryPointOptions';

export class SummaryPointOptions implements ISummaryPointOptions {
    initAccumulator?: any;
    addChartPoint: (
        points: ISummaryChartPoint[],
        grouped: IGroupedByMonth<INewStudiesDto>,
        accumulator?: any
    ) => any;

    constructor() {
        this.initAccumulator = 0;
        this.addChartPoint = (points, grouped, accumulator: number) => {
            accumulator = accumulator + grouped.entities.length;
            const monthName = getMonthName(grouped.month, 3);
            const newEntityNames = grouped.entities.map(entity => entity.name);

            points.push({
                year: grouped.year,
                monthName,
                entityAmount: accumulator,
                newEntityNames,
            });

            return accumulator;
        };
    }
}
