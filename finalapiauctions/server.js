const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ehsan Auctions application." });
});

require("./app/routes/auctions.routes")(app);

//TODO: web client home page
/* app.use(express.static('static')); */


const PORT = process.env.PORT || 2023;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});