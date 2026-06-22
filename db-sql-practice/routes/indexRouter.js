// routes/authorRouter.js
const { Router } = require("express");
const { searchUser } = require("../controllers/userController")
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    // Captures ?search=term from the URL; defaults to undefined if missing
    const searchQuery = req.query.search;

    // Pass the search query down to your database logic
    const usernames = await searchUser(searchQuery);

    // Always render the exact same index.ejs file
    res.render("index", { users: usernames, search: searchQuery || "" });
});



module.exports = indexRouter;