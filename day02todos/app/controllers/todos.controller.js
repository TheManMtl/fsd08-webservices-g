const ToDoclass = require("../models/todos.model");

//Create and Save a new Todo
exports.create = (req, res) => {

    // Validate request
   /*  if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } */

    var isValidResult = isValid(req, res);
    if (isValidResult === true) {
        // Create a Todo
        const todo = new ToDoclass({
            task: req.body.task,
            dueDate: req.body.dueDate,
            isDone: req.body.isDone || 'Pending'
        });

        // Save ToDo in the database
        ToDoclass.create(todo, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the ToDo."
                });
            else res.status(201).send(data);
        });
    } 
};

// Retrieve all Todos from the database (with condition).
exports.findAll = (req, res) => {

    const task = req.query.task;

    ToDoclass.getAll(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.status(200).send(data);
    });
};

//Find a single todo by the id
exports.findOne = (req, res) => {
    ToDoclass.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ToDo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ToDo with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
};

//Update a Todo by id
exports.update = (req, res) => {
    // Validate Request
    /* if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
 */
    console.log(req.body);

    //record need to be exists(404) -->record not found
    if (isValid(req, res)) {
        ToDoclass.updateById(
            req.params.id,
            new ToDoclass(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found ToDo with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating ToDo with id " + req.params.id
                        });
                    }
                } else res.status(200).send(true);
            }
        );
    }


};

//Delete a Todo with id
exports.delete = (req, res) => {
    ToDoclass.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ToDo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ToDo with id " + req.params.id
                });
            }
        } else res.status(200).send({ message: true });
    });
};

function isValid(req, res) {

    var isDoneEnum=['Pending','Done'];

    var year = req.body.dueDate.slice(0, 4);

    //console.log("isValid: ",res);
    if (req.body.id) {
        res.status(400).send({
            message: "id is provided by System!!! ToDo not saved ;)",
            result: false
        });
        //console.log("if cond: ",res.send.result);
        return false;
    }
    if (req.body.task.length < 1 || req.body.task.length > 100) {
        res.status(400).send({ message: "too big/small task! need help? task not saved!!" });
        return false;
    }
    if (year < 1900 || year > 2099) {
        res.status(400).send({ message: "Not in the correct year range!!" });
        return false;

    }
    if (!isDoneEnum.includes(req.body.isDone)) {
        res.status(400).send({ message: "Not supported value in Is done ;)" });
        return false;
    }
    return true;

}