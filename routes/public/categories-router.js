// PUBLIC / CATEGORIES -- ROUTER
// ==============================

// IMPORT FROM PACKAGES
const express = require("express")

// IMPORT FROM FILES
const categoryModel = require("../../models/category-model")

// ROUTES
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
    categoryModel.find(req.query, (err, foundCateogory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send(foundCateogory);
    })
})

    //BY ID
categoriesRouter.get("/:id", (req, res) => {
    let { id } = req.params
    categoryModel.findById(id, (err, foundCategory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else{
            console.log("Found Category Document at " + id);
            return res.send(foundCategory);
        }
   })
})



// EXPORTS
module.exports = categoriesRouter;