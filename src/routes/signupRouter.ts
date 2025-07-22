import { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/userController";

const signupRouter = Router();

signupRouter.get("/sign-up", (req: Request, res: Response) => res.render("sign-up-form"));
signupRouter.post("/sign-up", userController.createNewUserPost);

export default signupRouter;