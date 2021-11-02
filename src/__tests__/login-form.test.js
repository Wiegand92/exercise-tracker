import React from 'react';
import {render, screen} from '@testing-library/react';
import LoginForm from '../components/LoginForm';

test('The login form renders', () => {
  render(<LoginForm />);
  const form = screen.getByRole('heading');
  expect(form).not.toBeUndefined();
});
