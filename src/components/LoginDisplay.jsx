import React from 'react';
import LoginForm from './LoginForm';
import {useHistory} from 'react-router';
import userAPI from '../utils/userAPI';

const LoginDisplay = () => {
  const history = useHistory();

  const onSubmit = async (e, user) => {
    e.preventDefault();
    await userAPI.login(user).then(data => {
      if (data.user) {
        localStorage.setItem('token', data.auth);
        history.push('/');
      }
    });
  };
  const onCreate = async (e, user) => {
    e.preventDefault();
    await userAPI.add(user).catch(err => alert(`Error: ${err}`));
  };
  return <LoginForm onSubmit={onSubmit} onCreate={onCreate} />;
};

export default LoginDisplay;
