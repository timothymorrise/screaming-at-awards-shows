// TEST ROUTE 
// ==========================

// IMPORT FROM PACKAGES
const express = require('express')

// ROUTE AND METHODS
const testRouter = express.Router(); 

testRouter.get('/', (req, res) => {
    res.send("Hello world!");
});

// EXPORT MODULE
module.exports = testRouter 

