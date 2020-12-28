import React, { useEffect } from 'react';
import { UserListContainer } from './UserList/UserList.container';

function UserPage(props) {
  const { usersAreLoading, loadUsers } = props;

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <p>User page</p>

      {usersAreLoading && (
        <p>Users are loading...</p>
      )}

      <UserListContainer/>
    </div>
  );
}

export { UserPage };
