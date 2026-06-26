const Router = require("express");
const { createMessageGet, createMessagePost, deleteMessagePost } = require("../controllers/messageController");
const { messageValidation } = require("../middlewares/validation");
const { isAuthenticated } = require("../middlewares/authentication");
const messageRouter = Router();

messageRouter.get("/", isAuthenticated, createMessageGet);
messageRouter.post("/", isAuthenticated, messageValidation, createMessagePost);
messageRouter.post("/:id/delete", isAuthenticated, deleteMessagePost);
module.exports = messageRouter;