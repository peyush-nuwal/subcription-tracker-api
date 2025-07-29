import { Router } from "express";

const userRouter = Router();

// 🔹 Get all users
userRouter.get('/', (req, res) => res.send({ title: "Get all users" }));

// 🔹 Get details of a specific user by ID
userRouter.get('/:id', (req, res) => res.send({ title: "Get user details" }));

// 🔹 Create a new user
userRouter.post('/', (req, res) => res.send({ title: "Create new user" }));

// 🔹 Update user details by ID
userRouter.put('/:id', (req, res) => res.send({ title: "Update user details" }));

// 🔹 Delete a user by ID
userRouter.delete('/:id', (req, res) => res.send({ title: "Delete user" }));

export default userRouter;
