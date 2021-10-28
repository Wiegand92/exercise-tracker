import React, {useState} from 'react';

const CreateUser = () => {
  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = {username, password};

    fetch('/users/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
  };

  const handleLogin = e => {
    e.preventDefault();
    const user = {username, password};

    fetch('/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.user, data.auth);
        localStorage.setItem('token', data.auth);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="create-user">
      <p>Welcome to the create user page</p>
      <form onSubmit={handleSubmit}>
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={e => setUserame(e.target.value)}
          name="username"
        />
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
        <input type="submit" value="Create User" />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default CreateUser;
