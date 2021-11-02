import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';

import ExerciseForm from './ExerciseForm';
import exerciseAPI from '../utils/exerciseAPI';

const EditExercise = () => {
  const [exercise, setExercise] = useState({});
  const {id} = useParams();
  useEffect(() => {
    exerciseAPI.getById(setExercise, id);
  }, []);

  return <ExerciseForm exercise={exercise}></ExerciseForm>;
};

export default EditExercise;
