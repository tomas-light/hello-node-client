import React from 'react';

function UserList(props) {
  const { users } = props;
  return (
    <div>
      <p>Users</p>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { UserList };
