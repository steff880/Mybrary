// if we are not in production load the files from .env file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
// path for our views
app.set("views", __dirname + "/views");
// where our layout files are going to be
app.set("layout", "layouts/layout");
// use express layouts
app.use(expressLayouts);
// tell express where our public files are going to be
app.use(express.static("public"));

// import mongoose
const mongoose = require("mongoose");
// it has to be dependant on your environment
// pass in options of how t set up mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
