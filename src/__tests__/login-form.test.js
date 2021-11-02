import React from 'react';
import {render, screen} from '@testing-library/react';

import LoginForm from '../components/LoginForm';

test('The login form renders with all its components', () => {
  render(<LoginForm />);
  const heading = screen.getByRole('heading');
  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');
  const createUser = screen.getByText('Create User');
  const login = screen.getAllByRole('button')[0];

  expect(heading).toHaveTextContent('Login');
  expect(username).toBeDefined();
  expect(password).toBeDefined();
  expect(createUser).toBeDefined();
  expect(login).toBeDefined();
});
