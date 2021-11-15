import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './Navbar';
import CreateExercise from './CreateExercise';
import EditExercise from './EditExercises';
import ExerciseList from './ExercisesList';
import LoginDisplay from './LoginDisplay';

const App = () => (
  <Router className="app">
    <Navbar />
    <Route exact path="/" component={ExerciseList} />
    <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={LoginDisplay} />
  </Router>
);

export default App;
