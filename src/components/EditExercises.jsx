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
  useEffect(() => {
    console.log(exercise);
  }, [exercise]);

  return (
    <div className="edit-exercise">
      <p>Welcome to the edit exercise page {id}</p>
      <ExerciseForm exercise={exercise}></ExerciseForm>
    </div>
  );
};

export default EditExercise;
