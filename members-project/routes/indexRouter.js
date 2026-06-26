const { Router } = require("express");
const { getMessages } = require("../db/messageQueries")
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const rows = await getMessages();
    res.render("index", { user: req.user, messages: rows });
});

module.exports = indexRouter;
