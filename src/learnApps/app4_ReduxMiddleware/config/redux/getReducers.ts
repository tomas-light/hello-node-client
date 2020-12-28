import { ReducersMapObject } from 'redux';

import { userReducer } from '../../UserPage/redux';

export function getReducers(): ReducersMapObject<any, any> {
  return {
    user: userReducer,
  };
}
