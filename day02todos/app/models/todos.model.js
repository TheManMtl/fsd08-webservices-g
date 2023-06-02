const con = require("./db.js");

// constructor
const ToDoclass = function (todos) {
  this.task = todos.task;
  this.dueDate = todos.dueDate;
  this.isDone = todos.isDone;
};

//create a todo
ToDoclass.create = (newToDos, result) => {
  console.log('isDone controller: '+newToDos);
  con.query("INSERT INTO todos SET ?", newToDos, (err, res) => {
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
  con.query(`SELECT * FROM todos WHERE id = ${id}`, (err, res) => {
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



//update a todo 
ToDoclass.updateById = (id, todo, result) => {
  con.query(
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
  con.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
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


// return all todo[serach by task and return all if any]
ToDoclass.getAll = (params, result) => {
  let query = "SELECT * FROM todos";
  let vals=["task",'isDone','dueDate', 'id'];
  var col=[params];
  if (vals.includes(params)) {
    query += ` ORDER BY ??`;
  } else if (params) {
    query += ` WHERE task LIKE '%${params}%'`;
  }
  query=con.format(query,col)
  //console.log("query to exe:", query);
  con.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      //return;
    }

    //console.log("ToDos: ", res);
    result(null, res);
  });
};

module.exports = ToDoclass;