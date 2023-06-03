//create <<
//getAll <<
//getByCode <<
//update
//delete
//

const conDb = require("./db.js");

// constructor
const Airports = function (airports) {
    this.code = airports.code;
    this.city = airports.city;
    this.latitude = airports.latitude;
    this.longitude = airports.longitude;
    this.kind = airports.kind;
};

//create a todo
Airports.create = (newAirprt, result) => {

    conDb.query("INSERT INTO airports SET ?", newAirprt, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: res.insertCode, ...newAirprt });
    });
};


//return one todo by city
//FIXME: NOT WORKING
Airports.isCityExists = (city, result) => {
    console.log("UU are here!");
    conDb.query(`SELECT count(??) AS countCity FROM airports`, [city], (err, res) => {
        console.log("U are here!");
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("!res.length: ", !res.length);
        if (res.length > 0) {
            console.log("not found city: ", res[0]);
            return;
        }

        // not found airport with the id
        result({ available: "already_exists" }, null);
    });
};

//return one airport by code
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
/* 
//update a airpor 
Airports.updateById = (id, todo, result) => {
  conDb.query(
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
Airports.remove = (id, result) => {
  conDb.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
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
 */

// return all todo[default sort by code]
Airports.getAll = (sortOrder, result) => {
    console.log("sort: " + sortOrder);
    var query = conDb.format("SELECT * FROM airports ORDER BY ??", sortOrder);

    //console.log("query to exe:", query);
    conDb.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Airports;