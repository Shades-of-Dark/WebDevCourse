// routes/authorRouter.js
const { Router } = require("express");
const {
    createUsernameGet,
    createUsernamePost } = require("../controllers/userController")
const formRouter = Router();

formRouter.get("/", createUsernameGet);

formRouter.post("/", (req, res) => { console.log("username to be saved: ", req.body.username); createUsernamePost(req, res); });
module.exports = formRouter;