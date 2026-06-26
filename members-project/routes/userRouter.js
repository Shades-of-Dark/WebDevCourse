const Router = require("express");
const { signUpValidation } = require("../middlewares/validation");
const { createUserGet, createUserPost } = require("../controllers/userController");


const userRouter = Router();


userRouter.get("/", createUserGet);

userRouter.post("/", signUpValidation, createUserPost);

module.exports = userRouter;
