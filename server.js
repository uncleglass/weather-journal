// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => console.log(`running on localhost: ${port}`));

//Routes
const getRoute = "/data";
const postRoute = "/add";

app.get(getRoute, (req, res) => {
  res.send(projectData);
  console.log("sent data: ", projectData);
});

app.post(postRoute, (req, res) => {
  const { date, temp, userResponse } = req.body;
  projectData = { date, temp, userResponse };
  res.send(projectData);
  console.log("received data: ", projectData);
});
