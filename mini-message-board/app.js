
const path = require("node:path");
const express = require("express");
const { randomUUID } = require("node:crypto");
const app = express();
app.use(express.urlencoded({ extended: true }));
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
        id: randomUUID()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
        id: randomUUID()
    }
];


const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages })
});
app.get("/new", (req, res) => { res.render("form", { title: "Mini Messageboard" }) });
app.get("/message-details", (req, res) => { res.render("message", { title: "Mini Messageboard" }) });

app.post("/new", (req, res) => {
    messages.push({
        text: req.body.msg,
        user: req.body.username,
        added: new Date(),
        id: randomUUID()
    });
    res.redirect("/");
});

app.get("/message-details/:id", (req, res) => {
    const message = messages.find(m => m.id === req.params.id);
    res.render("message", { title: "Mini Messageboard", message: message });
});
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