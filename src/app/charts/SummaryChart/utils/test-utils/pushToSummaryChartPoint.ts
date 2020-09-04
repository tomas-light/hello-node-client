import { ISummaryChartPoint } from '../../models';

function pushToSummaryChartPoint(
    array: ISummaryChartPoint[],
    year: number,
    monthName: string,
    newEntityNames: string[] = []
): void {
    let entityAmount = 0;

    if (array.length === 0) {
        entityAmount = newEntityNames.length;
    }
    else {
        const prev = array[array.length - 1];
        entityAmount = prev.entityAmount + newEntityNames.length;
    }

    array.push({
        year,
        monthName,
        entityAmount,
        newEntityNames,
    });
}


interface Make {
    push: (year: number, monthName: string, newEntityNames?: string[]) => Make;
    build: () => ISummaryChartPoint[];
}

/*
example of result
[
    { year: 2019, monthName: 'Jan', entityAmount: 2, newEntityNames: [ 'user 1', 'user 2' ] },
    { year: 2019, monthName: 'Feb', entityAmount: 4, newEntityNames: [ 'user 3', 'user 4' ] },
],
*/
function makeSummaryChartPointArray(): Make {
    this.array = [] as ISummaryChartPoint[];
    this.push = (year: number, monthName: string, newEntityNames: string[] = []) => {
        pushToSummaryChartPoint(this.array, year, monthName, newEntityNames);
        return this;
    };
    this.build = (): ISummaryChartPoint[] => this.array;

    return this;
}

export { pushToSummaryChartPoint, makeSummaryChartPointArray };
