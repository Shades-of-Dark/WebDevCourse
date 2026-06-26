const { createUser, findUserByUsername } = require("../db/userQueries");
const bcrypt = require("bcryptjs");

function createUserGet(req, res) {
    res.render("signUp", { errors: [], data: {} });
}

async function createUserPost(req, res) {
    try {
        const { firstName, lastName, username, password } = req.body;

        const existingUser = await findUserByUsername(username);


        if (existingUser) {
            return res.status(400).render("signUp", {
                errors: [{ msg: "Username is already taken" }],
                data: { firstName, lastName, username }
            });
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await createUser(firstName, lastName, username, hashedPassword);

        res.redirect('/');
    } catch (err) {

        console.error(err);
        res.status(500).render("signUp", {
            errors: [{ msg: "Something went wrong on our end. Please try again." }],
            data: req.body
        });
    }
}


module.exports = { createUserGet, createUserPost };