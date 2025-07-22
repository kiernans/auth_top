import path from "node:path";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import signupRouter from "./routes/signupRouter";
import userController from "./controllers/userController";
import db from "./db/query";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Added to avoid having to pass req.user into each controller
// Puts into currentUser local variable
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", signupRouter);
app.get("/", userController.getAllUsers);
app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// Set up strategy for passport.authenticate() call later
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
)

interface User extends Express.User {
    id: string
}

passport.serializeUser((user, done) => {
    done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.listen(3000, () => console.log("app listening on port 3000!"));
