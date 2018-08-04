// MOVIE BALLOT -- MODEL
// ==============================

// IMPORT FROM PACKAGES
const mongoose = require("mongoose")

// SCHEMA
const ballotSchema = new mongoose.Schema(
    {
        awards_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        predicted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nominee"
        },
        favorite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nominee"
        },
        screamingAt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nominee"
        }
        ,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, { timestamps: { createdAt: 'created_at' } }
)

// EXPORTS
module.exports = mongoose.model("Ballot", ballotSchema)