import { Router } from "express";

const authRouter = Router();

// 🔹 Register a new user
authRouter.post('/sign-up', (req, res) => {
    res.send({ title: 'Sign up' });
});

// 🔹 Authenticate and log in an existing user
authRouter.post('/sign-in', (req, res) => {
    res.send({ title: 'Sign in' });
});

// 🔹 Log out the current user
authRouter.post('/sign-out', (req, res) => {
    res.send({ title: 'Sign out' });
});

export default authRouter;
