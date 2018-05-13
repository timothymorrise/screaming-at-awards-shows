// ADMIN / AWARDS -- ROUTE
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");

// IMPORT FROM FILES
const awardModel = require("../../models/awards-model")
const categoryModel = require("../../models/category-model")
const nomineeModel = require("../../models/nominee-model")

// ROUTES
const awardsRouter = express.Router()

const handleErr = (err, res) => {
    console.error(err);
    return res.status(500).send(err)
}

awardsRouter.route("/")
    .get((req, res) => {
        awardModel.find(req.query, (err, foundAwards) => {
            if (err) handleErr(err, res)
            return res.send(foundAwards)
        })
    })
    .post((req, res) => {
        let award = new awardModel(req.body)
        award.save((err, savedAward) => {
            if (err) {
                hanldeErr(err, send)
            } else {
                console.log("Post successfully added to the database")
                return res.send(award)
            }
        })
    })

//BY ID
awardsRouter.route("/:id")
    .get((req, res) => {
        let { id } = req.params
        awardModel.findById(id, (err, foundAward) => {
            if (err) {
                hanldeErr(err, res)
            } else {
                console.log("Found Award Document at " + id);
                return res.send(foundAward)
            }
        })
    })
    .delete((req, res) => {
        let { id } = req.params
        awardModel.findByIdAndRemove(id, (err, removedAward) => {
            if (err) {
                console.error(err)
                return res.status(500).send(err)
            } else {
                console.log("Removed Award Document at " + id)
                return res.send(removedAward)
            }
        })
    })
    .put((req, res) => {
        let { id } = req.params
        let updatedAward = new awardModel(req.body)
        awardModel.findByIdAndUpdate(id, updatedAward, { new: true }, (err, updatedAward) => {
            if (err) {
                console.error(err)
                return res.status(500).send(err)
            } else {
                console.log("Updated Award Document at " + id)
                return res.send(updatedAward)
            }
        })
    })

// POST ALL HELPER FUNCTIONS

const awardsPostAll = (req, res, categoryCallback, nomineesCallback) => {
    // VARIBALES
    let award = new awardModel(req.body)
    let queryObject = {
        "awards_show_name": award.awards_show_name,
        "awards_show_year": award.awards_show_year
    }
    let { categories } = req.body
    // POST TO MONGO
    award.save()
        .then(savedAward => {
            console.log("Award saved...")
            // PULL ID OF AWARD JUST POSTED
            awardModel.findOne(queryObject, "_id")
            .then(award => {
                let awardId = award._id
                console.log(awardId)
                // MAP AWARD ID TO CATEGORIES.AWARD_ID
                categories.map(category => {
                    category.award_show_id = awardId;
                    return category
                })
                categoryCallback(awardId, categories, res, nomineesCallback);
            })
            .catch()
        })
        .catch(err => {
            hanldeErr(err, res)
        })
}

const categoriesPostAll = (id, categoriesArr, res, nomineesCallback) => {
    categoryModel.insertMany(categoriesArr)
    .then(savedCategories => {
        console.log("Categories saved...")
        categoriesArr.map(category => {
            let { nominees } = category
            let queryObject = {
                award_name: category.award_name,
                award_show_id: id   
            }
            categoryModel.findOne(queryObject, "_id")
            .then(category => {
                let categoryId = category._id
                nomineesCallback(categoryId, nominees, res)
            })
        })
    })
    .catch(err => handleErr(err))
}

const nomineesPostAll = (id, nomineesArr, res) => {
    // MAP CATEGORY IDS TO NOMINEE.CATEGORY_ID
    let nominees = nomineesArr.map(nominee => {
        nominee.category_id = id;
        return nominee
    })
    // POST NOMINEES ARRAY
    nomineeModel.insertMany(nominees)
        .then( savedNominees => {
            console.log("Nominees Posted")
        })
        .catch(err => hanldeErr(err))
}

awardsRouter.post("/post-all", (req, res) => {
    awardsPostAll(req, res, categoriesPostAll, nomineesPostAll);
    return res.send(req.body);
})


// EXPORT
module.exports = awardsRouter