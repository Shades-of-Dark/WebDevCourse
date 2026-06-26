const pool = require("./pool");
const { randomUUID } = require("node:crypto");

async function createMessage(title, text, userName) {
    const query = `
        INSERT INTO message (id, title, text, timestamp, username) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const messageId = randomUUID();
    const { rows } = await pool.query(query, [messageId, title, text, new Date(), userName]);
    return rows[0];
}

async function deleteMessage(id) {
    const query = `
        DELETE FROM message 
        WHERE id = $1 
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM message ORDER BY timestamp DESC;");
    return rows || []; 
}


module.exports = { createMessage, deleteMessage, getMessages };