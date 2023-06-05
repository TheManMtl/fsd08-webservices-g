const Auction = require("../models/auctions.model");

//Create and Save a new Auction
exports.create = (req, res) => {

    //if all validation passes true otherwise false
    if (isValid(req, res)) {


        // Create a Auction obj
        const auction = new Auction({

            id: req.body.id,
            itemCode: req.body.itemCode,
            itemDesc: req.body.itemDesc,
            sellerEmail: req.body.sellerEmail,
            lastBidderEmail: '',
            lastBid: 0
        
        });

        /*  
             {
            id: req.body.id,
            itemCode: req.body.itemCode,
            itemDesc: req.body.itemDesc,
            sellerEmail: req.body.sellerEmail,
            lastBidderEmail: req.body.lastBidderEmail,
            lastBid: req.body.lastBid
             }
        */

        // Save Auction in the database
        Auction.create(auction, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "error in creating Auction."
                });
            else res.status(201).send(data);
        });
    }
};

// Retrieve all Auctions from the database.
exports.findAll = (req, res) => {

    const sortBy = req.query.sortBy;

    Auction.getAll(sortBy, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "error in fetching Auctions."
            });
        else {
            res.status(200).send(data);
        }
    });
};

//Find a single Auction by id
exports.findOne = (req, res) => {
    Auction.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `auction not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `error in fetching an auction.${req.params.id}` 
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

//Update an auction by id
exports.update = (req, res) => {

    
    
        Auction.updateById(
            req.params.id,
            new Auction(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `auction not found  with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: `updating not successfull with id ${req.params.id}.`
                        });
                    }
                } else res.status(200).send(data);
            }
        );
    
};

//validation controller 
// returns trure if all conditions met
function isValid(req, res) {

    
    let itemCode = req.body.itemCode;
    let itemDesc = req.body.itemDesc;


    /*let id = auction.id;  
    let sellerEmail = req.body.sellerEmail;
     let lastBidderEmail = req.body.lastBidderEmail;
     let lastBid = req.body.lastBid; */

    //TODO: seller email validation
    //TODO: itemCode IS UNIOQUE

    //validate body
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return false;
    }

    //itemDesc ONLY 1-200 letters
    if (itemDesc.length < 1 || itemDesc.length > 200) {
        res.status(400).send({
            message: "description empty or more than 200 charachters!!! action not completed ;)"
        });
        return false;
    }

    //itemCode ONLY 2-20 letters
    if (itemCode.length < 2 || itemCode.length > 20) {
        res.status(400).send({
            message: "item code needs at least 2 and maximum 20 charachters!!! action not completed ;)"
        });
        return false;
    }

    return true;

}