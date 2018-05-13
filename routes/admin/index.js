// ADMIN -- ROUTE
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");

// IMPORT FROM FILES - MODEL/
const awardsRouter = require("./awards-route.js");
const categoriesRouter = require("./categories-router.js");
const nomineesRouter = require("./nominees-router.js")

// APPLY MIDDLEWARE AND ROUTES 
const adminRouter = express.Router();
adminRouter.use("/awards", awardsRouter);
adminRouter.use("/categories", categoriesRouter);
adminRouter.use("/nominees", nomineesRouter);

// EXPORT
module.exports = adminRouter

// need to go over different properties of req and 
    