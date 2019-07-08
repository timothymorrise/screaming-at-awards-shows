// USER AUTHENTICATION -- ROUTE
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");
const jwt = require("jsonwebtoken");

// IMPORT FROM FILES -- MODELS
const User = require("../models/user-model");

// ROUTE AND METHODS
const authRouter = express.Router();

authRouter.post("/signup", (req, res) => {
    // check for existing user
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) return res.status(500).send({ success: false, err });
        // send error if there's already a user
        if (existingUser !== null) {
            return res.status(400).send({ success: false, err: "That username already exists!" });
        }
        // creates new user if there's no return
        const newUser = new User(req.body);
        console.log(newUser)
        newUser.save((err, user) => {
            if (err) {
                console.error(err)
                return res.status(500).send({ success: false, err });
            }
            // deliver token
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(201).send({ success: true, user: user.toObject(), token });
        });
    });
});

// authRouter.use(passport.initialize);

authRouter.post("/login", (req, res) => {
    // find username
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) return res.status(500).send(err);
        // upon no return
        if (!user) {
            return res.status(403).send({ success: false, err: "Email or password are incorrect" })
        } else {
        // check w/ bcrypt, send token if it clears 
        user.checkPassword(user, req.body.password, (err, match) => {
                if (err) throw (err);
                if (!match) res.status(401).send({success: false, message: "Incorrect password"});
                const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: "24h"});
                return res.send({ token: token, user: user.withoutPassword(), success: true, message: "Here's your token!" })
            })
        }
    });
});

// EXPORT
module.exports = authRouter
