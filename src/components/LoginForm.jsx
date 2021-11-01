import React, {useState} from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = e => {
    e.preventDefault();
    const user = {username, password};

    fetch('/users/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(() => {
        setUsername('');
        setPassword('');
        alert('User Created!');
      })
      .catch(err => alert(`Error: ${err}`));
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
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      Username:{' '}
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        name="username"
        autoComplete="off"
        required
      />
      Password:{' '}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        name="password"
        required
      />
      <input type="submit" value="Login" />
      <button onClick={handleCreate}>Create User</button>
    </form>
  );
};

export default LoginForm;
