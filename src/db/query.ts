import pool from "./pool";

async function insertUser(username: string, password: string) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        username,
        password,
    ]);
}

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
};

async function getUserByUsername(username: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function getUserById(id: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

export default {
    insertUser,
    getAllUsers,
    getUserByUsername,
    getUserById
};