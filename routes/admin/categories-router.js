// ADMIN / CATEGORIES -- ROUTER
// ==============================

// IMPORT FROM PACKAGES
const express = require("express")

// IMPORT FROM FILES
const categoryModel = require("../../models/category-model")

// ROUTES
const categoriesRouter = express.Router();

categoriesRouter.route("/")
.get((req, res) => {
    categoryModel.find(req.query, (err, foundCateogory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send(foundCateogory);
    })
})
.post((req, res) => {
    let award = new categoryModel(req.body)
    award.save((err, savedCategory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Post successfully added to the database");
            return res.send(savedCategory);
        }
    })
})

    //BY ID
categoriesRouter.route("/:id")
.get((req, res) => {
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
.delete((req, res) => {
    let { id } = req.params
    categoryModel.findByIdAndRemove( id, (err, removedCategory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Removed Category Document at " + id);
            return res.send(removedCategory);
        }
    })
})
.put((req, res) => {
    let { id } = req.params
    let updatedCategory = new categoryModel(req.body)
    categoryModel.findByIdAndUpdate(id, updatedCategory, {new: true}, (err, updatedCategory) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("Updated Category Document at " + id);
            return res.send(updatedCategory);;
        }
    })
})

// EXPORTS
module.exports = categoriesRouter;