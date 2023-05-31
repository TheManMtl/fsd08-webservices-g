const sql = require("./db.js");

// constructor
const ToDoclass = function (todos) {
  this.task = todos.task;
  this.dueDate = todos.dueDate;
  this.isDone = todos.isDone;
};

//create a todo
ToDoclass.create = (newToDos, result) => {
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
ToDoclass.findById = (id, result) => {
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

    // not found ToDO with the id
    result({ kind: "not_found" }, null);
  });
};

// return all todo[serach by task and return all if any]
ToDoclass.getAll = (task, result) => {
  let query = "SELECT * FROM todos";

  if (task) {
    query += ` WHERE task LIKE '%${task}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("ToDos: ", res);
    result(null, res);
  });
};

//update a todo 
ToDoclass.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE todos SET task = ?, dueDate = ?, isDone = ? WHERE id = ?",
    [todo.task, todo.dueDate, todo.isDone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      //problem affectedRows
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
ToDoclass.remove = (id, result) => {
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


module.exports = ToDoclass;