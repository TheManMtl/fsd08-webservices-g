//Express is for building the Rest apis
const express = require("express");

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");



//create an Express app
const app = express();


//logger npmlog
const logger = require("npmlog");

//origin
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
  logger.warn('From Npmlog', 'Npmlog is simple too %j', {'message': 'test'});
  res.json({'message': 'Hello npmlog!'});
});

// simple route
/* app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDoS application." });
}); */

require("./app/routes/todos.routes.js")(app);

app.use(express.static('static'));

// set port, listen for requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});