module.exports = app => {                 
    const airport = require("../controllers/airports.controller.js");
  
    var router = require("express").Router();
    var mapRouter=require("express").Router();
  
    // Create a new airport
    router.post("/", airport.create);
 
    // Retrieve all airport
    
    router.get("/", airport.findAll);

    mapRouter.get("/map",airport.findAllCoordinates);

    router.get("/:code", airport.findOne);
  
    // Update an airport with code
   router.put("/:code([a-zA-z0-9]+)", airport.update);
  
    // Delete an airport with code
    router.delete("/:code([a-zA-z0-9]+)", airport.delete);

    
    app.use('api/maps',mapRouter)
    
    app.use('/api/airports', router);
  };