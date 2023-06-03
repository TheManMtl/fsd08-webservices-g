const Airport = require("../models/airports.model");

//Create and Save a new Todo
exports.create = (req, res) => {

    //if all validation passes true otherwise false
    if (isValid(req, res)) {

        
        // Create a Airport obj
        const airport = new Airport({
            code: req.body.code,
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

    let code = req.body.code;
    let city = req.body.city;

    //TOFIX: in case no validation delete the variable
    // let latitude = req.body.latitude;
    // let longitude = req.body.longitude;
    // let kind = req.body.kind;

    var kindList = ['Passenger', 'Cargo', 'Military', 'Private'];

    //validate body
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //code ONLY chars
    if (!isNaN(code)) {
        res.status(400).send({
            message: "code must be only charachter!!! Airport not saved ;)"
        });
        return false;
    }
    //code ONLY 3-6 letters
    if (code.length < 3 || code.length > 6) {
        res.status(400).send({
            message: "code must be 3-6 charachter!!! Airport not saved ;)"  
        });
        return false;
    }

    //FIXME: validation duplicate city
    //city cannot be duplicated
    //if (city_exists.err == `city name  ${req.params.city} already exists.` || req.body.data) return false;


    return true;

}