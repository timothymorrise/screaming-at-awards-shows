// PUBLIC / AWARDS -- ROUTE
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");

// IMPORT FROM FILES - MODEL
const awardModel = require("../../models/awards-model");
const categoryModel = require("../../models/category-model");
const noimneeModel = require("../../models/nominee-model");

// ROUTES
const awardsRouter = express.Router();
awardsRouter.get("/", (req, res) => {
    awardModel.find(req.query, (err, foundAwards) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }
        return res.send(foundAwards)
    })
})

awardsRouter.route("/:id")
    .get((req, res) => {
        let { id } = req.params
        awardModel.findById(id, (err, foundAward) => {
            if (err) {
                console.error(err)
                return res.status(500).send(err)
            } else {
                console.log("Found Award Document at " + id);
                return res.send(foundAward)
            }
        })
    })

awardsRouter.get("/get-all", (req, res) => {
    let awardDocuments = [];
    let categoryDocuments = [];
    let nomineeDocuments = [];
    awardModel.find(req.query, (err, foundAwards) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        awardDocuments = foundAwards
    })
    categoryModel.find(req.query, (err, foundCategories) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        categoryDocuments = foundCategories
    })
    noimneeModel.find(req.query, (err, foundNominees) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        nomineeDocuments = foundNominees
    })

    awardDocuments.map(award => {
        award.categories = [];
        categoryDocuments.map(category => {
            if(category.award_id === award._id) {
                award.categories = [...award.categories, category]
                let currentCategory = award.categories[award.categories.length - 1]
                currentCategory.nominees = [];
                nomineeDocuments.map(nominee => {
                    if(nominee.category_id === category._id) {
                        currentCategory.nominees = [...currentCategory.nominees, nominee]
                    }
                })
            }
        })
    })

    return res.send(awardDocuments);
})

awardsRouter.get("/get-all/:id", (req, res) => {
    let award = {};
    let categoryDocuments = [];
    let nomineeDocuments = [];
    awardModel.findById(req.params.id, (err, foundAward) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err);
        }
        award = foundAward
    })
    categoryModel.find(req.query, (err, foundCategories) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        categoryDocuments = foundCategories
    })
    noimneeModel.find(req.query, (err, foundNominees) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        nomineeDocuments = foundNominees
    })

        award.categories = [];
        categoryDocuments.map(category => {
            if(category.award_id === award._id) {
                award.categories = [...award.categories, category]
                let currentCategory = award.categories[award.categories.length - 1]
                currentCategory.nominees = [];
                nomineeDocuments.map(nominee => {
                    if(nominee.category_id === category._id) {
                        currentCategory.nominees = [...currentCategory.nominees, nominee]
                    }
                })
            }
        })
})



// EXPORTS
module.exports = awardsRouter

// AwardShow
// awardshowname: the oscars
    // 
    



