import React from 'react';
import LoginForm from './LoginForm';
import {useHistory} from 'react-router';
import userAPI from '../utils/userAPI';

const LoginDisplay = () => {
  const history = useHistory();

  const onSubmit = async (e, user) => {
    e.preventDefault();
    const data = await userAPI.login(user);

    if (data.user) {
      localStorage.setItem('token', data.auth);
      history.push('/');
    }
    if (data.error) {
      alert(`Error: ${data.error}`);
    }
  };
  const onCreate = async (e, user) => {
    e.preventDefault();
    await userAPI.add(user);
  };
  return <LoginForm onSubmit={onSubmit} onCreate={onCreate} />;
};

export default LoginDisplay;
