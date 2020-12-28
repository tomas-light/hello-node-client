import React from 'react';
import { UserListContainer } from './UserList/UserList.container';

function UserPage() {
  return (
    <div>
      <p>User page</p>

      <UserListContainer/>
    </div>
  );
}

export { UserPage };
