import { UserActions } from './User.actions';
import { loadUsers } from './loadUsers';

const userWatchers = new Map([
  [
    UserActions.LOAD_USERS,
    loadUsers,
  ],
]);

export { userWatchers };
