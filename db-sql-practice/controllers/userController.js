const db = require("../db/queries");


async function getUsernames(req, res) {
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    return ("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {

    res.render("form", {});
}

async function createUsernamePost(req, res) {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
}

async function clearUsers(req, res) {
    await db.deleteAll();
    res.redirect("/")
}

async function searchUser(searchQuery) {
    const usernames = await db.searchForUser(searchQuery);
    return usernames;
}

module.exports = {
    searchUser,
    getUsernames,
    createUsernameGet,
    createUsernamePost,
    clearUsers
};
