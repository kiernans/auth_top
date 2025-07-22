import path from "node:path";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import signupRouter from "./routes/signupRouter";
import userController from "./controllers/userController";


const app: Express = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", signupRouter);
app.get("/", userController.getAllUsers);

app.listen(3000, () => console.log("app listening on port 3000!"));
