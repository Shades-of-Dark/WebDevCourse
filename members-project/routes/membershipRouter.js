const Router = require("express");
const { joinMemberGet, joinMemberPost, joinAdminGet, joinAdminPost, accessMemberGet } = require("../controllers/membershipController");
const { isAuthenticated } = require("../middlewares/authentication");

const membershipRouter = Router();
membershipRouter.get("/", isAuthenticated, accessMemberGet)

membershipRouter.get("/join", isAuthenticated, joinMemberGet);
membershipRouter.post("/join", isAuthenticated, joinMemberPost);

membershipRouter.get("/admin", isAuthenticated, joinAdminGet);
membershipRouter.post("/admin", isAuthenticated, joinAdminPost);

module.exports = membershipRouter;
