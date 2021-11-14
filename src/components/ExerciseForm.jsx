import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import exerciseAPI from '../utils/exerciseAPI';
import dayjs from 'dayjs';

const ExerciseForm = ({exercise}) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const history = useHistory();

  useEffect(() => {
    if (!!exercise) {
      const {description, duration, date} = exercise;
      if (description) setDescription(description);
      if (duration) setDuration(duration);
      if (date) setDate(dayjs(date).format('YYYY-MM-DD'));
    }
  }, [exercise]);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {description, duration, date};
    const token = localStorage.getItem('token');
    if (!!exercise) {
      const res = await exerciseAPI.update(exercise, data, token);
      if (res.status === 200) history.push('/');
    } else {
      !!token ? exerciseAPI.add(data, token) : alert('You are not logged in!');
      history.push('/');
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!!exercise) {
      const res = await exerciseAPI.delete(exercise, token);
      if (res.status === 200) history.push('/');
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="exercise-form">
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
  );
};

export default ExerciseForm;
