// SERVER 
// ==============================

// IMPORT FROM PACKAGES
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("express")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt");

// IMPORT FROM FILES -- ROUTES
const authRouter = require("./routes/auth-route.js");
const adminRouter = require("./routes/admin/index.js");
const publicRouter = require("./routes/public/index.js");
const ballotRouter = require("./routes/ballot-route.js");
const profileRouter = require("./routes/profile-route");

// OTHER IMPORTS
const path = require("path");

// PORT VARIABLE
const port = process.env.PORT || 8080

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/screaming-at-award-shows", (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
})

// APPLY MIDDLEWARE & ROUTES
app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/public", publicRouter)
app.use("/auth", authRouter)
app.use("/api/ballots", ballotRouter)
app.use("/api/profile", profileRouter)


app.use(express.static(path.join(__dirname, "client", "build")))

// LISTENING ON PORT
app.get("*", (req, res) => {
    console.log("Test: Flag - pre path.join moment")
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Server live");
})

