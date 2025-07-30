import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

// 🔹 Register a new user
authRouter.post('/sign-up',signUp);

// 🔹 Authenticate and log in an existing user
authRouter.post('/sign-in',signIn);

// 🔹 Log out the current user
authRouter.post('/sign-out',signOut);

export default authRouter;
