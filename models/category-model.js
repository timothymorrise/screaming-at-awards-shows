// CATEOGORY -- MODEL

// IMPORT FROM PACKAGES
const mongoose = require("mongoose");

// SCHEMA
const categorySchema = new mongoose.Schema(
    {   
        award_name: String,
        order_number: String,
        award_show_id: 
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Award"
        }
    }
)

// EXPORTS
module.exports = mongoose.model("Category", categorySchema)