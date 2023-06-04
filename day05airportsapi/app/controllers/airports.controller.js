const Airport = require("../models/airports.model");

//Create and Save a new Todo
exports.create = (req, res) => {

    //if all validation passes true otherwise false
    if (isValid(req, res)) {


        // Create a Airport obj
        const airport = new Airport({
            code: req.body.code.toUpperCase(),
            city: req.body.city,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            kind: req.body.kind,
        });

        /*  
             {
            "code": "code",
            "city": "city",
            "latitude": "latitude",
            "longitude": "longitude",
            "kind": "kind",
             }
        */
        console.log("airport obj in creat: ", airport);
        // Save Airport in the database
        Airport.create(airport, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Airport."
                });
            else res.status(201).send(data);
        });
    }
};

// Retrieve all Aiports from the database.

exports.findAll = (req, res) => {

    const sort = req.query.sort;

    Airport.getAll(sort, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving airports."
            });
        else {
            res.status(200).send(data);
        }
    });
};

//Find a single airport by code
exports.findOne = (req, res) => {
    Airport.findByCode(req.params.code, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ToDo with code ${req.params.code}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving airport with code " + req.params.code
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};


//Update an airport by code
exports.update = (req, res) => {

    //record need to be exists(404) -->record not found
    if (isValid(req, res)) {
        Airport.updateByCode(
            req.params.code,
            new Airport(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found airport with code ${req.params.code}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating airport with id " + req.params.code
                        });
                    }
                } else res.status(200).send(data);
            }
        );
    }
};


//Delete a Todo with id
exports.delete = (req, res) => {
    Airport.remove(req.params.code, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found airport with code ${req.params.code}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete airport with id " + req.params.code
                });
            }
        } else res.status(200).send(data);
    });
};

//FIXEME: TO RETURN IF THE CITY EXISTS
/* var city_exists = (req, res) => {
    Airport.isCityExists(req.city, (err, data) => {
        console.log("city_exists.err.message: ");
        if (err) {
            if (err.available == "already_exists") {
                res.status(404).send({
                    message: `city name  ${req.params.city} already exists.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving city name " + req.params.city
                });
            }
        } else {
            res.status(200).send(data);
        }
    }); 

};
*/
//validation controller
function isValid(req, res) {
    let codeRegex = /^[a-zA-Z]+$/
    let code = req.body.code;
    let city = req.body.city;

    //TOFIX: in case no validation delete the variable
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let kind = req.body.kind;

    var kindList = ['Passenger', 'Cargo', 'Military', 'Private'];

    //validate body
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return false;
    }
    //code ONLY chars
    if (!isNaN(code) || !codeRegex.test(code)) {
        res.status(400).send({
            message: "code must be only charachter!!! action not completed ;)"
        });
        return false;
    }
    //code ONLY 3-6 letters
    if (code.length < 3 || code.length > 6) {
        res.status(400).send({
            message: "code must be 3-6 charachter!!! action not completed ;)"
        });
        return false;
    }

    if (!kindList.includes(kind)) {
        res.status(400).send({
            message: "No such type of airplane!!! action not completed"
        });
        return false;
    }

    // latitude -90 to 90,
    // longitude -180 to 180
    console.log("atitude -90 to 90: ", latitude < -90)

    if (latitude < -90 || latitude > 90 && longitude < -180 || longitude > 180) {
        res.status(400).send({
            message: "No such location!!! action not completed!!"
        });
        return false;
    }

    if(city.length<1 || city.lenght>40){
        res.status(400).send({
            message: "city is too short or too long!!! action not completed!!"
        });
        return false;
    }
    //FIXME: validation duplicate city
    //city cannot be duplicated
    //if (city_exists.err == `city name  ${req.params.city} already exists.` || req.body.data) return false;


    return true;

}