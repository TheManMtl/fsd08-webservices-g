//Express is for building the Rest apis
const express = require("express");

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

//create an Express app
const app = express();

//origin
var corsOptions = {
  origin: "http://localhost:2595"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TODOS application." });
 //console.log(res);
});

//require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 2590;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});