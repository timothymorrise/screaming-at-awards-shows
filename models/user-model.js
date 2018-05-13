// USER -- MODEL
// ==============================

// IMPORT FROM PACKAGES
const mongoose = require("mongoose");  
// const bcrypt = require("bcrypt")

// VARIABLES
// const salt = bcrypt.genSaltSync(10);

// SCHEMA
const userSchema = new mongoose.Schema({  
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

// MIDDLEWARE/METHODS
// userSchema.pre("save", next => {
//     this.password = bcrypt.hashSync(this.password, salt)
//     next();
// })

// userSchema.methods.auth = (passwordAttempt, cb) => {
//     bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
//         if(err) {
//             console.log(err)
//             cb(false)
//         } else {
//             cb(isMatch)
//         }
//     })
// }

// EXPORTS
module.exports = mongoose.model("User", userSchema);