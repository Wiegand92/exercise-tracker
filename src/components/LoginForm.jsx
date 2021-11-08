import React, {useState} from 'react';

const LoginForm = ({onSubmit, onCreate}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="login-form"
      onSubmit={e => onSubmit(e, {username, password})}
    >
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
      <button
        onClick={e => {
          onCreate(e, {username, password}).then(() => {
            setUsername('');
            setPassword('');
            alert('User Created!');
          });
        }}
      >
        Create User
      </button>
    </form>
  );
};

export default LoginForm;
