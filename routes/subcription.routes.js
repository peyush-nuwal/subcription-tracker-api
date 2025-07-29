import { Router } from "express";

const subcriptionRouter = Router()

// 🔹 Get all subscriptions
subcriptionRouter.get('/', (req, res) => res.send({ title: "Get all subscriptions" }))

// 🔹 Get details of a specific subscription by ID
subcriptionRouter.get('/:id', (req, res) => res.send({ title: "Get subscription details" }))

// 🔹 Create a new subscription
subcriptionRouter.post('/', (req, res) => res.send({ title: "Create subscription" }))

// 🔹 Update an existing subscription by ID
subcriptionRouter.put('/:id', (req, res) => res.send({ title: "Update subscription" }))

// 🔹 Delete a subscription by ID
subcriptionRouter.delete('/:id', (req, res) => res.send({ title: "Delete subscription" }))

// 🔹 Get all subscriptions for a specific user
subcriptionRouter.get('/user/:id', (req, res) => res.send({ title: "Get all subscriptions for a user" }))

// 🔹 Cancel a subscription by ID
subcriptionRouter.put('/:id/cancel', (req, res) => res.send({
    title: "Cancel user subscription"
}))

// 🔹 Get all upcoming renewals
subcriptionRouter.get('/upcoming-renewals', (req, res) => res.send({
    title: "Get upcoming subscription renewals"
}))

export default subcriptionRouter
