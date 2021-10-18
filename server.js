const express = require('express');
const app = express();
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
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully`);
});
//Serve static files//

app.use(express.static(__dirname + '/public'));

// Start Server //
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
