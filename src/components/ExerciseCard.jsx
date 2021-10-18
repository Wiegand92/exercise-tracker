import React from 'react';

const ExerciseList = ({exercise}) => {
  return (
    <div className="exercise-list">
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
