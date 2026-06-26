const { findUserByUsername } = require("../db/userQueries");
const bcrypt = require("bcryptjs");

async function validateUser(username, password, done) {
    try {

        const user = await findUserByUsername(username);


        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
        }


        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

function storeUserSession(user, done) {
    done(null, user.username);
}

async function retrieveUserSession(username, done) {
    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }

}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

module.exports = { validateUser, storeUserSession, retrieveUserSession, isAuthenticated };
