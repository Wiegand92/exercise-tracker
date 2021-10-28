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

      <table>
        <thead>
          <tr>
            <td colSpan="4">Exercises List</td>
          </tr>
          <tr>
            <td>User</td>
            <td>Description</td>
            <td>Duration</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {exercises.map(exercise => (
            <ExerciseCard key={exercise._id} exercise={exercise} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
