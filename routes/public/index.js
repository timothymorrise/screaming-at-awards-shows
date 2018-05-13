// PUBLIC -- ROUTE
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");

// IMPORT FROM FILES - MODEL/
const awardsRouter = require("./awards-router.js");
const categoriesRouter = require("./categories-router.js");
const nomineesRouter = require("./nominees-router.js")

// APPLY MIDDLEWARE AND ROUTES 
const publicRouter = express.Router();
publicRouter.use("/awards", awardsRouter);
publicRouter.use("/categories", categoriesRouter);
publicRouter.use("/nominees", nomineesRouter);

// EXPORT
module.exports = publicRouter

// need to go over different properties of req and 