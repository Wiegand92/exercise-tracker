import React, {useState, useEffect} from 'react';
import getDateString from '../utils/getDateString';

const ExerciseForm = ({exercise}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(getDateString());

  useEffect(() => {
    if (!!exercise) {
      const {username, description, duration, date} = exercise;
      if (username) setName(username);
      if (description) setDescription(description);
      if (duration) setDuration(duration);
      if (date) setDate(getDateString(date));
    }
  }, [exercise]);

  const onSubmit = e => {
    e.preventDefault();
    const data = {name, description, duration, date};
    if (!!exercise) {
      fetch(`/exercises/update/${exercise._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      })
        .then(res =>
          res.status === 200 ? (window.location = '/') : res.json(),
        )
        .then(err => alert(err));
    } else {
      fetch('/exercises/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      }).then(res =>
        res.status === 200 ? (window.location = '/') : console.log(res),
      );
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    if (!!exercise) {
      fetch(`/exercises/${exercise._id}`, {
        method: 'DELETE',
      }).then(res =>
        res.status === 200 ? (window.location = '/') : console.log(res),
      );
    }
  };

  return (
    <div className="exercise-form">
      <form onSubmit={e => onSubmit(e)}>
        Name:{' '}
        <input
          type="text"
          name="name"
          value={name}
          className="name"
          onChange={e => setName(e.target.value)}
        />
        Description:{' '}
        <input
          type="text"
          name="description"
          value={description}
          className="description"
          onChange={e => setDescription(e.target.value)}
        />
        Duration (minutes):{' '}
        <input
          value={duration}
          name="duration"
          type="number"
          onChange={e => setDuration(e.target.value)}
        />
        Date:{' '}
        <input
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="submit"
          value={!!exercise ? 'Update Exercise' : 'Submit Exercise'}
        />
        {!!exercise ? (
          <button onClick={handleDelete}>Delete Exercise</button>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default ExerciseForm;
