const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// If we deploy, will set the port to whatever server, else 4200 //
const PORT = process.env.PORT || 4200;

//Middleware//

app.use(cors());
app.use(express.json());

//Mongoose Connection//
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully`);
});

//Serve static files//
app.use(express.static(__dirname + '/public'));

// Routes //
const exercisesRouter = require('./server/routes/exercises');
const usersRouter = require('./server/routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Start Server //
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
