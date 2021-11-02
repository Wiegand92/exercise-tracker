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
      <table>
        <thead>
          <tr>
            <td colSpan="4">Exercises List</td>
          </tr>
          <tr>
            <td className="username">User</td>
            <td className="description">Description</td>
            <td className="duration">Duration (minutes)</td>
            <td className="date">Date</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {exercises.map(exercise => (
            <ExerciseCard key={exercise._id} exercise={exercise} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExerciseList;
