import React from 'react';
import ExerciseList from '../components/ExercisesList';
import exercises from '../__fixtures__/exercises';
import {rest} from 'msw';
import {setupServer} from 'msw/node/';
import {render} from '@testing-library/react';

const server = setupServer(
  rest.get('/exercises', (res, req, ctx) => {
    return res(ctx.json(exercises));
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

describe('ExerciseList', () => {
  it('fetches all exercises', () => {
    render(<ExerciseList />);
  });
});
