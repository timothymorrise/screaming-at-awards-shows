// USER -- MODEL
// ==============================

// IMPORT FROM PACKAGES
const mongoose = require("mongoose");  
const bcrypt = require("bcrypt")

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
userSchema.methods.checkPassword = (user, passwordPlainTxt, callback) => {
    console.log("in the check password method:", user, passwordPlainTxt, user.password)
    bcrypt.compare(passwordPlainTxt, user.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.pre("save", function (next) {
    let user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

userSchema.methods.withoutPassword = function () {  
    const user = this.toObject();
    delete user.password;
    return user;
};

// EXPORTS
module.exports = mongoose.model("User", userSchema);