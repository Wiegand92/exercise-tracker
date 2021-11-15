import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import ExerciseForm from '../components/ExerciseForm';
import exercises from '../__fixtures__/exercises';
import {rest} from 'msw';
import {setupServer} from 'msw/node/';
const server = setupServer(
  rest.post('/exercises/add', (req, res, ctx) => {
    if (req.headers['x-access-token'])
      return res(ctx.status(200), ctx.json('Exercise added!'));
    else return res(ctx.status(404), ctx.json('You are not logged in'));
  }),

  rest.delete('/exercises/:id', (req, res, ctx) => {
    if (req.headers['x-access-token']) return res(ctx.status(200));
    else return res(ctx.status(404));
  }),

  rest.post('/exercises/update/:id', (req, res, ctx) => {
    if (req.headers['x-access-token']) return res(ctx.status(200));
    else return res(ctx.status(404));
  }),
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('ExerciseForm', () => {
  it('renders with default fields if an exercise is not passed', () => {
    render(<ExerciseForm />);

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);

    expect(description).toHaveValue('');
    expect(duration).toHaveValue(0);
    expect(date).toHaveValue(dayjs().format('YYYY-MM-DD'));
  });

  it('accepts user input', () => {
    render(<ExerciseForm />);

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);

    userEvent.type(description, 'Bike Ride');
    userEvent.type(duration, '20');
    userEvent.type(date, '2017-12-01');

    expect(description).toHaveValue('Bike Ride');
    expect(duration).toHaveValue(20);
    expect(date).toHaveValue('2017-12-01');
  });

  it('submits a new exercise and redirects to exercise list', () => {
    const history = createMemoryHistory();
    window.localStorage.setItem('token', 'mock_token');
    render(
      <Router history={history}>
        <ExerciseForm />
      </Router>,
    );

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);
    const submit = screen.getByRole('button', {name: /submit exercise/i});

    userEvent.type(description, 'Bike Ride');
    userEvent.type(duration, '{selectall}{delete}20');
    userEvent.type(date, '2017-12-01');
    userEvent.click(submit);

    expect(history.location.pathname).toBe(`/`);
  });

  it('alerts a user if not logged in', () => {
    const history = createMemoryHistory();
    window.alert = jest.fn();
    localStorage.removeItem('token');
    render(
      <Router history={history}>
        <ExerciseForm />
      </Router>,
    );

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);
    const submit = screen.getByRole('button', {name: /submit exercise/i});

    userEvent.type(description, 'Bike Ride');
    userEvent.type(duration, '{selectall}{delete}20');
    userEvent.type(date, '2017-12-01');
    userEvent.click(submit);

    expect(window.alert).toHaveBeenCalled();
  });

  it('renders with data when an exercise is passed', () => {
    render(<ExerciseForm exercise={exercises[0]} />);

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);

    expect(description).toHaveValue(exercises[0].description);
    expect(duration).toHaveValue(exercises[0].duration);
    expect(date).toHaveValue(dayjs(exercises[0].date).format('YYYY-MM-DD'));
  });

  it('renders with delete button when exercise is passed', () => {
    render(<ExerciseForm exercise={exercises[0]} />);

    const deleteButton = screen.getByRole('button', {name: /delete/i});

    expect(deleteButton).toBeInTheDocument();
  });

  it('updates an exercise when supplied and redirects to exercise list', () => {
    const history = createMemoryHistory();
    window.localStorage.setItem('token', 'mock_token');
    render(
      <Router history={history}>
        <ExerciseForm exercise={exercises[0]} />
      </Router>,
    );

    const description = screen.getByRole('textbox');
    const duration = screen.getByRole('spinbutton');
    const date = screen.getByLabelText(/date/i);
    const submit = screen.getByRole('button', {name: /update exercise/i});

    userEvent.type(description, '{selectall}{delete}Run');
    userEvent.type(duration, '{selectall}{delete}15');
    userEvent.type(date, '2017-12-01');
    userEvent.click(submit);

    expect(history.location.pathname).toBe(`/`);
  });

  it('deletes an exercise', () => {
    const history = createMemoryHistory();
    window.localStorage.setItem('token', 'mock_token');
    render(
      <Router history={history}>
        <ExerciseForm exercise={exercises[0]} />
      </Router>,
    );

    const deleteButton = screen.getByRole('button', {name: /delete/i});

    userEvent.click(deleteButton);
    expect(history.location.pathname).toBe(`/`);
  });

  it('does not allow deletion if not logged in', () => {
    const history = createMemoryHistory();
    window.alert = jest.fn();
    localStorage.removeItem('token');
    render(
      <Router history={history}>
        <ExerciseForm exercise={exercises[0]} />
      </Router>,
    );

    const deleteButton = screen.getByRole('button', {name: /delete/i});

    userEvent.click(deleteButton);
    expect(window.alert).toHaveBeenCalled();
    expect(history.location.pathname).toBe(`/`);
  });
});
