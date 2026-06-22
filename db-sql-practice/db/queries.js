const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function deleteAll() {
    await pool.query("TRUNCATE TABLE usernames");
    console.log("Cleared database!");
}

async function searchForUser(username) {
    if (username) {
        const queryText = "SELECT * FROM usernames WHERE username LIKE $1"
        const values = [`%${username}%`]
        const result = await pool.query(queryText, values);
        return result.rows;
    }
    const result = await pool.query("SELECT * FROM usernames");
    return result.rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
    getAllUsernames,
    insertUsername,
    searchForUser,
    deleteAll
};
