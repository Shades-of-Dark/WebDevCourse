
const { Router } = require("express");
//const {
const { clearUsers } = require("../controllers/userController");
const deleteRouter = Router();

deleteRouter.get("/", clearUsers);

module.exports = deleteRouter;