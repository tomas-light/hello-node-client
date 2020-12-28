import { UserActions } from './User.actions';

export async function loadUsers(dispatch) {
  dispatch(UserActions.updateStore({
    usersAreLoading: true,
  }));

  let users = [];
  const response = await fetch('api/users');
  if (response.ok) {
    users = await response.json();
  }

  dispatch(UserActions.updateStore({
    usersAreLoading: false,
    users,
  }));
}
