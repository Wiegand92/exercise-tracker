import React, {useState, useEffect} from 'react';
import getDateString from '../utils/getDateString';
import exerciseAPI from '../utils/exerciseAPI';

const ExerciseForm = ({exercise}) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(getDateString());

  useEffect(() => {
    if (!!exercise) {
      const {description, duration, date} = exercise;
      if (description) setDescription(description);
      if (duration) setDuration(duration);
      if (date) setDate(getDateString(date));
    }
  }, [exercise]);

  const handleSubmit = e => {
    e.preventDefault();
    const data = {description, duration, date};
    const token = localStorage.getItem('token');
    if (!!exercise) {
      exerciseAPI.update(exercise, data, token);
    } else {
      exerciseAPI.add(data, token);
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!!exercise) {
      exerciseAPI.delete(exercise, token);
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="exercise-form">
      <div className="input-box">
        Description:{' '}
        <input
          type="text"
          name="description"
          value={description}
          className="description"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="input-box">
        Duration (minutes):{' '}
        <input
          value={duration}
          name="duration"
          type="number"
          onChange={e => setDuration(e.target.value)}
        />
      </div>
      <div className="input-box">
        Date:{' '}
        <input
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
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
