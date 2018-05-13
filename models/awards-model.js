//AWARDS -- MODEL 
// ==============================

// IMPORT FROM PACKAGES
const mongoose = require("mongoose")

// SCHMEA
const awardSchema = new mongoose.Schema(
    {
        awards_show_name: {
           type: String,
           required: true 
        },
        awards_show_year: {
            type: String,
            required: true
        },
    }
)

// EXPORTS
module.exports = mongoose.model("Award", awardSchema)