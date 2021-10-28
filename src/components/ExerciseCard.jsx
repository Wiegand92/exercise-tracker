import React from 'react';

const ExerciseList = ({exercise}) => {
  console.log(exercise._id);
  const handleClick = () => {
    window.location = `/edit/${exercise._id}`;
  };
  return (
    <div className="exercise-list" onClick={handleClick}>
      <ul className="exercise">
        <li>User: {exercise.username}</li>
        <li>Description: {exercise.description}</li>
        <li>Time: {exercise.duration}</li>
        <li>Date: {new Date(exercise.date).toDateString()}</li>
      </ul>
    </div>
  );
};

export default ExerciseList;
