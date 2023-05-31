module.exports = app => {
    const todos = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Todos
    router.post("/", todos.create);
  
    // Retrieve all ToDos
    router.get("/", todos.findAll);
  
    // Retrieve a single ToDos with id
    router.get("/:id", todos.findOne);
  
    // Update a ToDo with id
    router.put("/:id", todos.update);
  
    // Delete a ToDo with id
    router.delete("/:id", todos.delete);
  
    app.use('/api/todos', router);
  };