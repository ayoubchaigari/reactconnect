// App.js
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container">
      <h1>ReactConnect</h1>
      {!selectedUser ? (
        <UserList onSelectUser={setSelectedUser} />
      ) : (
        <>
          <button className="back-button" onClick={() => setSelectedUser(null)}>← Retour</button>
          <UserPosts user={selectedUser} />
        </>
      )}
    </div>
  );
}

export default App;

