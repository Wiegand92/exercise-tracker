import React, {useState} from 'react';

const LoginForm = () => {
  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = e => {
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
        console.log(data);
        if (data.user) {
          localStorage.setItem('token', data.auth);
          window.location = '/';
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="create-user">
      <p>Welcome to the create user page</p>
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="Login" />
        <button onClick={handleCreate}>Create User</button>
      </form>
    </div>
  );
};

export default LoginForm;
