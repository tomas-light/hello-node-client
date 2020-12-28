import { userWatchers } from '../../UserPage/redux';

export function getWatchers() {
  return new Map([
    ...userWatchers,
  ]);
}
