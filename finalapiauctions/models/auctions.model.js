//getAll(sort) xxx
//getById xxx
//create xxx
//update xxx

const db = require("./db.js");

// constructor
const Auction = function (auction) {
    this.id = auction.id;
    this.itemCode = auction.itemCode;
    this.itemDesc = auction.itemDesc;
    this.sellerEmail = auction.sellerEmail;
    this.lastBidderEmail = auction.lastBidderEmail;
    this.kind = auction.lastBid;
};


// return all auctions[default sort by id]
Auction.getAll = (sortOrder, result) => {

    //sort by kind is a enum needs a different query

    var query = db.format(`SELECT * FROM auctions ORDER BY ??  ASC`, sortOrder);

    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


//return one auction by id
Auction.findById = (id, result) => {
    db.query(`SELECT * FROM auctions WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found auction: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found auction with the id
        result({ kind: "not_found" }, null);
    });
};


//create an auction
Auction.create = (newAuction, result) => {

    newAuction.lastBid = 0;
    auction.lastBidderEmail = "";

    db.query("INSERT INTO auctions SET ?", newAuction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id, itemCode: itemCode, itemDesc: itemDesc, sellerEmail: sellerEmail });
    });
};


//update an auction 
Auction.updateById = (id, auction, result) => {
    db.query(
        "UPDATE auctions SET lastBid = ? lastBidderEmail = ? WHERE id = ?",
        [auction.lastBid, auction.lastBidderEmail, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //auction not found  with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated auction: ", { id: id, itemCode: itemCode, itemDesc: itemDesc, sellerEmail: sellerEmail });
            result(null, { id: id, itemCode: itemCode, itemDesc: itemDesc, sellerEmail: sellerEmail });
        }
    );
};


module.exports = Auction;