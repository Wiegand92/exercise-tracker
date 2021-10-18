import React, {useEffect, useState} from 'react';
import ExerciseCard from './ExerciseCard';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('/exercises')
      .then(response => response.json())
      .then(exercisesList => setExercises(exercisesList))
      .catch(err => console.error(`Error: ${err}`));
  }, []);

  return (
    <div className="exercise-list">
      <p>Welcome to the exercise list page</p>

      {exercises.map(exercise => {
        const Exercise = <ExerciseCard exercise={exercise} />;
        return Exercise;
      })}
    </div>
  );
};

export default ExerciseList;
