//create <<
//getAll <<
//getByCode <<
//update <<
//delete <<

const conDb = require("./db.js");

// constructor
const Airports = function (airports) {
    this.code = airports.code;
    this.city = airports.city;
    this.latitude = airports.latitude;
    this.longitude = airports.longitude;
    this.kind = airports.kind;
};

//create a airport
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




//return one airport by code
Airports.findByCode = (code, result) => {
    conDb.query(`SELECT * FROM airports WHERE code = ?`, [code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found airport: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found airport with the code
        result({ kind: "not_found" }, null);
    });
};

//update an airport 
Airports.updateByCode = (code, airport, result) => {
    conDb.query(
        "UPDATE airports SET city = ?, latitude = ?, longitude = ?, kind = ? WHERE code = ?",
        [airport.city, airport.latitude, airport.longitude, airport.kind, code],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            //FIXME: affectedRows is not the ideal solution
            if (res.affectedRows == 0) {
                // not found airport with the code
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated airport: ", { code: code, ...airport });
            result(null, { code: code, ...airport });
        }
    );
};


//delete an airport
Airports.remove = (code, result) => {
    conDb.query("DELETE FROM airports WHERE code = ?", code, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found airport with the code
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("airport deleted successfully with code: ", code);
        result(null, res);
    });
};


// return all airports[default sort by code]
Airports.getAll = (sortOrder, result) => {
    console.log("sort: " + sortOrder);
    var query = conDb.format("SELECT * FROM airports ORDER BY ?? ASC", sortOrder);

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

//return one airport by city
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

        // not found airport with the code
        result({ available: "already_exists" }, null);
    });
};

module.exports = Airports;