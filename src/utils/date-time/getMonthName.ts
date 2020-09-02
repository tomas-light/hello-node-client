import { MONTH_NAMES } from './constants';

function getMonthName(date: Date, charCount?: number) {
    const month = date.getMonth();
    let monthName = MONTH_NAMES[month];
    if (charCount) {
        monthName = monthName.substr(0, charCount);
    }
    return monthName;
}

function getMonthByName(monthName: string): number {
    let month = MONTH_NAMES.indexOf(monthName);
    if (month >= 0) {
        return month;
    }

    const shortedMonthNames = MONTH_NAMES.map(name => name.substr(0, monthName.length));
    month = shortedMonthNames.indexOf(monthName);
    return month;
}

export { getMonthName, getMonthByName };
