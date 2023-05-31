//Create and Save a new Todo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Todo
    const todo = new ToDo({
        task: req.body.task,
        dueDate: req.body.dueDate,
        isDone: req.body.isDone || 'Pending'
    });

    // Save Tutorial in the database
    ToDo.create(todo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.status(201).send(data);
    });
};

// Retrieve all Todos from the database (with condition).
exports.findAll = (req, res) => {
    const task = req.query.task;

    ToDo.getAll(task, (err, data) => {
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
    ToDo.findById(req.params.id, (err, data) => {
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
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    ToDo.updateById(
        req.params.id,
        new ToDo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.body(false).status(404).send({
                        message: `Not found ToDo with id ${req.params.id}.`
                    });
                } else {
                    res.body(false).status(500).send({
                        message: "Error updating ToDo with id " + req.params.id
                    });
                }
            } else res.body(true).status(200).send(data);
        }
    );
};

//Delete a Todo with id
exports.delete = (req, res) => {
    ToDo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.body(false).status(404).send({
                    message: `Not found ToDo with id ${req.params.id}.`
                });
            } else {
                res.body(false).status(500).send({
                    message: "Could not delete ToDo with id " + req.params.id
                });
            }
        } else res.body(true).status(200).send({ message: `ToDo was deleted successfully!` });
    });
};