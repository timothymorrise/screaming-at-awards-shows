// ADMIN / NOMINEES -- ROUTER
// ==============================

// IMPORT FROM PACKAGES
const express = require("express")

// IMPORT FROM FILES
const nomineeModel = require("../../models/nominee-model")

// ROUTES
const nomineesRouter = express.Router();

nomineesRouter.route("/")
.get((req, res) => {
    nomineeModel.find(req.query, (err, foundNominees) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send(foundNominees);
    })
})
.post((req, res) => {
    let category = new nomineeModel(req.body)
    category.save((err, savedNominee) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Post successfully added to the database");
            return res.send(savedNominee);
        }
    })
})

    //BY ID
nomineesRouter.route("/:id")
.get((req, res) => {
    let { id } = req.params
    nomineeModel.findById(id, (err, foundNominee) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else{
            console.log("Found Nominee Document at " + id);
            return res.send(foundNominee);
        }
   })
})
.delete((req, res) => {
    let { id } = req.params
    nomineeModel.findByIdAndRemove( id, (err, removedNominee) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Removed Nominee Document at " + id);
            return res.send(removedNominee);
        }
    })
})
.put((req, res) => {
    let { id } = req.params
    let updatedNominee = new nomineeModel(req.body)
    nomineeModel.findByIdAndUpdate(id, updatedNominee, {new: true}, (err, updatedNominee) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Updated Nominee Document at " + id);
            return res.send(updatedNominee);;
        }
    })
})

// EXPORTS
module.exports = nomineesRouter;