export class UserActions {
  static PREFIX = 'USER_';

  static UPDATE_STORE = `${UserActions.PREFIX}UPDATE_STORE`;
  static LOAD_USERS = `${UserActions.PREFIX}LOAD_USERS`;

  static updateStore = (partialStore) => ({
    type: UserActions.UPDATE_STORE,
    payload: partialStore,
  });

  static loadUsers = () => ({
    type: UserActions.LOAD_USERS,
  });
}
