
const path = require("node:path");
const express = require("express");
const formRouter = require("./routes/formRouter");
const indexRouter = require("./routes/indexRouter");
const deleteRouter = require("./routes/deleteRouter");


const app = express();

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/new", formRouter);
app.use("/delete", deleteRouter);



const PORT = 3000;
app.listen(PORT, (error) => {
    // This is important!
    // Without this, any startup errors will silently fail
    // instead of giving you a helpful error message.
    if (error) {
        throw error;
    }

});