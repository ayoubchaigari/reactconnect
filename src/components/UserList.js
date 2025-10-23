// components/UserList.js
import React, { useEffect, useState } from 'react';

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="list-group">
      {users.map(user => (
        <div key={user.id} className="list-group-item">
          <div>
            <strong>{user.name}</strong><br />
            <small>{user.email}</small>
          </div>
          <button onClick={() => onSelectUser(user)}>Voir ses posts</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
