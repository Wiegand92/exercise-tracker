import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseTable from '../components/ExerciseTable';

const exercises = [
  {
    _id: 1,
    username: 'Alex',
    description: 'Bike Ride',
    duration: 20,
    date: Date(),
  },
  {
    _id: 2,
    username: 'Billy',
    description: 'Bike Ride',
    duration: 20,
    date: Date(),
  },
  {
    _id: 3,
    username: 'Frank',
    description: 'Bike Ride',
    duration: 20,
    date: Date(),
  },
  {
    _id: 4,
    username: 'Zaphod',
    description: 'Bike Ride',
    duration: 20,
    date: Date(),
  },
];

describe('Exercise Table', () => {
  it('Renders the header', () => {
    render(<ExerciseTable exercises={[]} />);

    const header = screen.getByText(/exercises list/i);

    expect(header).toHaveTextContent(/exercises list/i);
  });

  it('Renders a list of exercises', () => {
    render(<ExerciseTable exercises={exercises} />);

    const row1 = screen.getByRole('row', {
      name: new RegExp(`${exercises[0].username}`, 'i'),
    });
    const row2 = screen.getByRole('row', {
      name: new RegExp(`${exercises[1].username}`, 'i'),
    });
    const row3 = screen.getByRole('row', {
      name: new RegExp(`${exercises[2].username}`, 'i'),
    });

    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
    expect(row3).toBeInTheDocument();
  });

  it('Redirects to the correct exercise on click', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ExerciseTable exercises={exercises} />
      </Router>,
    );

    const row1 = screen.getByRole('row', {
      name: new RegExp(`${exercises[0].username}`, 'i'),
    });

    userEvent.click(row1);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe(`/edit/${exercises[0]._id}`);
  });
});
