import { useEffect, useState } from 'react';
import { loadUsers } from './loadUsers';
import { UserList } from './UserList';

export function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers().then(users => {
      setUsers(users);
    });
  }, []);

  return UserList({ users });
}
