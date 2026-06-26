const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { validateUser, retrieveUserSession, storeUserSession } = require("./middlewares/authentication")
const LocalStrategy = require('passport-local').Strategy;


const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter")
const messageRouter = require("./routes/messageRouter");
const membershipRouter = require("./routes/membershipRouter");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize())
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => { validateUser(username, password, done) }));
passport.serializeUser((user, done) => { storeUserSession(user, done) });

passport.deserializeUser(async (username, done) => { retrieveUserSession(username, done) });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.use("/", indexRouter)
app.use("/sign-up", userRouter);
app.use("/new-message", messageRouter);
app.use("/membership", membershipRouter);

app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});


const PORT = 3000;
app.listen(PORT, (error) => { if (error) { throw error; } console.log(`Website running on port ${PORT}!`); });