import React from 'react';

const ExerciseList = ({exercise}) => {
  const handleClick = () => {
    window.location = `/edit/${exercise._id}`;
  };
  return (
    <tr className="exercise-list" onClick={handleClick}>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{new Date(exercise.date).toDateString()}</td>
    </tr>
  );
};

export default ExerciseList;
