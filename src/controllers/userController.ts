import { Request, Response, NextFunction } from "express";
import db from "../db/query";
import bcrypt from "bcryptjs";

async function getAllUsers(req: Request, res: Response) {
    const users = await db.getAllUsers();
    console.log(users);
    res.render("index", { users: users, user: res.locals.currentUser });
};

async function createNewUserPost(req: Request, res: Response, next: NextFunction) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.insertUser(req.body.username, hashedPassword);
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

export default {
    getAllUsers,
    createNewUserPost
};