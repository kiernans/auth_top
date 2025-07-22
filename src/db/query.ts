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

export default {
    insertUser,
    getAllUsers
};