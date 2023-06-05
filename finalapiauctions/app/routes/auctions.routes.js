module.exports = app => {                 
    const auction = require("../controllers/auctions.controller.js");
  
    var router = require("express").Router();
  
    // new auction router
    router.post("/", auction.create);
 
    // fetch all auction router
    router.get("/", auction.findAll);

    //fetch one auction by id router
    router.get("/:id([0-9]+)", auction.findOne);
  
    // auction update router
   router.patch("/:id([0-9]+)", auction.update);
    
    app.use('/api/airports', router);
  };