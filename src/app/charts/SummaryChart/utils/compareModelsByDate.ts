import { INewStudiesDto } from '../models';

function compareModelsByDate(left: INewStudiesDto, right: INewStudiesDto) {
    const leftMilliseconds = left.startAt.getMilliseconds();
    const rightMilliseconds = right.startAt.getMilliseconds();
    if (leftMilliseconds > rightMilliseconds) {
        return -1;
    }
    return 0;
}

export { compareModelsByDate };
