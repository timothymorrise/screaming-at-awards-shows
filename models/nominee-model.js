// NOMINEE -- MODEL

// IMPORT FROM PACKAGES
const mongoose = require("mongoose")

// SCHEMA
const nomineeModel = new mongoose.Schema(
    {
        film_name: String,
        recipient: String,
        imgUrl: String,
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    }
)

// EXPORTS
module.exports = mongoose.model("Nominee", nomineeModel)