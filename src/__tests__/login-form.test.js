import React from 'react';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from '../components/LoginForm';

test('The login form renders with all its components', () => {
  const {asFragment} = render(<LoginForm />);
  expect(asFragment()).toMatchSnapshot();
});

test('The login form accepts user input', async () => {
  render(<LoginForm />);

  const username = screen.getByLabelText(/username/i);
  const password = screen.getByLabelText(/password/i);

  await userEvent.type(username, 'username');
  await userEvent.type(password, 'password');

  expect(username).toHaveValue('username');
  expect(password).toHaveValue('password');
});

test('The login form properly submits data', async () => {
  const onSubmit = jest.fn(e => e.preventDefault());
  render(<LoginForm onSubmit={onSubmit} />);

  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');

  await userEvent.type(username, 'username');
  await userEvent.type(password, 'password');
  const login = screen.getAllByRole('button')[0];
  userEvent.click(login);
  expect(onSubmit).toHaveBeenCalled();
});

test('The login form properly creates a user', async () => {
  window.alert = jest.fn();
  const promise = Promise.resolve();
  const onCreate = jest.fn((e, user) => {
    e.preventDefault();
    return promise;
  });
  const onSubmit = jest.fn();
  render(<LoginForm onCreate={onCreate} onSubmit={onSubmit} />);

  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');
  const createUser = screen.getByRole('button', {name: /create user/i});
  userEvent.type(username, 'username');
  userEvent.type(password, 'password');

  await act(async () => {
    await userEvent.click(createUser);
  });
  
  expect(onCreate).toHaveBeenCalled();
  expect(onCreate).toHaveBeenCalledWith(
    expect.objectContaining({defaultPrevented: true}),
    expect.objectContaining({
      username: 'username',
      password: 'password',
    }),
  );
});
