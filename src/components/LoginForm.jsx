import React, {useState} from 'react';
import {useHistory} from 'react-router';
import userAPI from '../utils/userAPI';

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = e => {
    e.preventDefault();
    const user = {username, password};
    userAPI.add(user, setUsername, setPassword);
  };

  const handleLogin = e => {
    e.preventDefault();
    const user = {username, password};
    userAPI.login(user, history);
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        id="username"
        autoComplete="off"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        id="password"
        required
      />
      <input type="submit" value="Login" />
      <button onClick={handleCreate}>Create User</button>
    </form>
  );
};

export default LoginForm;
