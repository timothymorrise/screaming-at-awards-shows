// PUBLIC / NOMINEES -- ROUTER
// ==============================

// IMPORT FROM PACKAGES
const express = require("express")

// IMPORT FROM FILES
const NomineeModel = require("../../models/nominee-model")

// ROUTES
const nomineesRouter = express.Router();

nomineesRouter.get("/", (req, res) => {
    NomineeModel.find(req.query, (err, foundNominees) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send(foundNominees);
    })
})


    //BY ID
nomineesRouter.get("/:id", (req, res) => {
    let { id } = req.params
    NomineeModel.findById(id, (err, foundNominee) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else{
            console.log("Found Category Document at " + id);
            return res.send(foundNominee);
        }
   })
})



// EXPORTS
module.exports = nomineesRouter;