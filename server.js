const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

// If we deploy, will set the port to whatever server, else 4200 //
const PORT = process.env.PORT || 4200;

//Middleware//

app.use(cors());
app.use(express.json());

//Serve static files//

app.use(express.static(__dirname + '/public'));

// Start Server //
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
