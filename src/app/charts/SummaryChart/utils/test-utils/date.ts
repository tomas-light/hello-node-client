function date(year: number, month: number, day: number) {
    return new Date(Date.UTC(year, month, day));
}

export { date };
