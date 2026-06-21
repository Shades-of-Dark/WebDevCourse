
const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.js
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


// app.js
const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
];
const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
    res.render("index", { links: links, users: users });
});
app.get("/about", (req, res) => { res.render("about", { links: links, users: users }) })
const PORT = 3000;
app.listen(PORT, (error) => {
    // This is important!
    // Without this, any startup errors will silently fail
    // instead of giving you a helpful error message.
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});