import React from 'react';

const ExerciseList = ({exercise}) => {
  const handleClick = () => {
    window.location = `/edit/${exercise._id}`;
  };
  return (
    <tr className="exercise-list" onClick={handleClick}>
      <td className="username">{exercise.username}</td>
      <td className="description">{exercise.description}</td>
      <td className="duration">{exercise.duration}</td>
      <td className="date">{new Date(exercise.date).toDateString()}</td>
    </tr>
  );
};

export default ExerciseList;
