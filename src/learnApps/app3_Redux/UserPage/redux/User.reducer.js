import { UserStore } from './User.store';
import { UserActions } from './User.actions';

export function userReducer(store = new UserStore(), action) {
  if (action.type === UserActions.UPDATE_STORE) {
    return {
      ...store,
      ...action.payload,
    };
  }

  return store;
}
