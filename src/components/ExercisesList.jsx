import React, {useEffect, useState} from 'react';
import ExerciseCard from './ExerciseCard';
import exerciseAPI from '../utils/exerciseAPI';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    exerciseAPI.get(setExercises);
  }, []);

  return (
    <div className="exercise-list">
      <p>Welcome to the exercise list page</p>

      {exercises.map(exercise => {
        const Exercise = (
          <ExerciseCard key={exercise._id} exercise={exercise} />
        );
        return Exercise;
      })}
    </div>
  );
};

export default ExerciseList;
