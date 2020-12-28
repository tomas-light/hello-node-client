import React from 'react';
import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async function load() {
      const response = await fetch('api/users');
      if (response.ok) {
        setUsers(await response.json());
      }
    })();
  }, []);

  return (
    <div>
      <p>User page</p>

      <div>
        <p>Users</p>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Users };


import { UserPage } from '../../app2_GoodComponent/UserPage/UserPage';

function fn() {
  return (
    <div>
      <Users/>
      <UserPage/>
    </div>
  );
}

