module.exports = app => {                 
    const airport = require("../controllers/airports.controller.js");
  
    var router = require("express").Router();
  
    // Create a new airport
    router.post("/", airport.create);
 
    // Retrieve all airport
    
    router.get("/", airport.findAll);

    //router.get("/", todos.sortByTask);
  
    // Retrieve a single airport with city
    //router.get("/:city", airport.isCityExists);
  
    // Update a airport with id
    //FIXME: not implemented
   // router.put("/:id([0-9]+)", airport.update);
  
    // Delete a airport with id
    //FIXME: not implemented
    //router.delete("/:id([0-9]+)", airport.delete);
    
    app.use('/api/airport', router);
  };