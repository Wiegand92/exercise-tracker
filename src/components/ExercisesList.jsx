import React, {useEffect, useState} from 'react';
import exerciseAPI from '../utils/exerciseAPI';
import ExerciseTable from './ExerciseTable';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(async () => {
    const exercisesArray = await exerciseAPI.get();
    setExercises(exercisesArray);
  }, []);

  return <ExerciseTable exercises={exercises} />;
};

export default ExerciseList;
