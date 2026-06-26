// db/userQueries.js
const pool = require("./pool");

async function createUser(firstName, lastName, userName, password) {
    const query = `
        INSERT INTO users (first_name, last_name, username, password) 
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const { rows } = await pool.query(query, [firstName, lastName, userName, password]);
    return rows[0];
}

async function findUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
    return rows[0];
}

async function updateMemberStatus(username, memberStatus) {
    const { rows } = await pool.query(
        "UPDATE users SET is_member = $1 WHERE username = $2 RETURNING *;",
        [memberStatus, username]
    );
    return rows[0];
}

async function updateAdminStatus(username, adminStatus) {
    const { rows } = await pool.query(
        "UPDATE users SET is_admin = $1 WHERE username = $2 RETURNING *;",
        [adminStatus, username]
    );
    return rows[0];
}

module.exports = { createUser, findUserByUsername, updateMemberStatus, updateAdminStatus };
