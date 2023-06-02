module.exports = app => {
    const todos = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Todos
    router.post("/", todos.create);
  
    // Retrieve all ToDos
    router.get("/", todos.findAll);

    //router.get("/", todos.sortByTask);
  
    // Retrieve a single ToDos with id
    router.get("/:id([0-9]+)", todos.findOne);
  
    // Update a ToDo with id
    router.put("/:id([0-9]+)", todos.update);
  
    // Delete a ToDo with id
    router.delete("/:id([0-9]+)", todos.delete);
  
    app.use('/api/todos', router);
  };