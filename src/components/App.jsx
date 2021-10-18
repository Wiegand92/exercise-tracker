import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
  <Router>
    <Navbar />
    <br />
    <Route path="/" exact component={ExerciseList} />
    <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={CreateUser} />
  </Router>
);

export default App;
