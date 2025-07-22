import { Request, Response, NextFunction } from "express";
import db from "../db/query";

async function getAllUsers(req: Request, res: Response) {
    const users = await db.getAllUsers();

    res.render("index", { users: users, user: res.locals.currentUser });
};

async function createNewUserPost(req: Request, res: Response, next: NextFunction) {
    try {
        await db.insertUser(req.body.username, req.body.password);
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

export default {
    getAllUsers,
    createNewUserPost
};