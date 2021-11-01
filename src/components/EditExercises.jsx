import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';

import ExerciseForm from './ExerciseForm';

const EditExercise = () => {
  const [exercise, setExercise] = useState({});
  const {id} = useParams();
  useEffect(() => {
    fetch(`/exercises/${id}`)
      .then(response => response.json())
      .then(data => setExercise({...data}))
      .catch(err => console.error(err));
  }, []);

  return <ExerciseForm exercise={exercise}></ExerciseForm>;
};

export default EditExercise;
