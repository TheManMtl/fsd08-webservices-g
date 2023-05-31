const sql = require("./db.js");

// constructor
const ToDos = function(todos) {
  this.task = todos.task;
  this.dueDate = todos.dueDate;
  this.isDone = todos.isDone;
};

//create a todo
ToDos.create = (newToDos, result) => {
  sql.query("INSERT INTO todos SET ?", newToDos, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todos: ", { id: res.insertId, ...newToDos });
    result(null, { id: res.insertId, ...newToDos });
  });
};


//return one todo by id
ToDos.findById = (id, result) => {
  sql.query(`SELECT * FROM todos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todos: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

// return all todo[serach by task and return all if any]
ToDos.getAll = (task, result) => {
  let query = "SELECT * FROM tutorials";

  if (task) {
    query += ` WHERE task LIKE '%${task}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

//update a todo 
ToDos.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE tutorials SET task = ?, dueDate = ?, isDone = ? WHERE id = ?",
    [todo.task, todo.dueDate, todo.isDone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found todo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todo: ", { id: id, ...todo });
      result(null, { id: id, ...todo });
    }
  );
};


//delete a todo
ToDos.remove = (id, result) => {
  sql.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found todo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};


module.exports = ToDos;