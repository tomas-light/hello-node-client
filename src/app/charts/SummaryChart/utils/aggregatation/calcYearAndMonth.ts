import { MONTH_INDEXES, MONTHS_IN_YEAR } from '@utils/date-time/constants';
import { INewStudiesDto } from '../../models';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';

function calcYearAndMonth(
    grouped: IGroupedByMonth<INewStudiesDto>,
    currentMonthDiff: number
): [ number, number ] {
    let month = grouped.month + 1;

    if (currentMonthDiff < MONTHS_IN_YEAR) {
        // current year
        if (month > currentMonthDiff) {
            return [ grouped.year, getMonthIndex(month - currentMonthDiff) ];
        }
        const previousYear = grouped.year - 1;
        const monthInPreviousYear = MONTHS_IN_YEAR - currentMonthDiff + month;
        return [ previousYear, getMonthIndex(monthInPreviousYear) ];
    }

    const yearsDiff = Math.trunc(currentMonthDiff / MONTHS_IN_YEAR);
    let year = grouped.year - yearsDiff;
    month = grouped.month - (currentMonthDiff - MONTHS_IN_YEAR * yearsDiff);

    if (month < 0) {
        year--;
        month = MONTHS_IN_YEAR + month;
    }

    return [ year, month ];
}

function getMonthIndex(month: number) {
    const index = month - 1;
    if (index === -1) {
        return MONTH_INDEXES.December;
    }
    return index;
}

export { calcYearAndMonth };