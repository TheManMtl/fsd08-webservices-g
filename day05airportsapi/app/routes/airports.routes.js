module.exports = app => {                 
    const airport = require("../controllers/airports.controller.js");
  
    var router = require("express").Router();
  
    // Create a new airport
    router.post("/", airport.create);
 
    // Retrieve all airport
    
    router.get("/", airport.findAll);

    router.get("/:code", airport.findOne);
  
    // Update an airport with code
   router.put("/:code([a-zA-z0-9]+)", airport.update);
  
    // Delete an airport with code
    router.delete("/:code([a-zA-z0-9]+)", airport.delete);

    
    
    app.use('/api/airports', router);
  };