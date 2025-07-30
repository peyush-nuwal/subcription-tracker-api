import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'



// Controller: Handles user signup logic with transaction safety
export const signUp = async (req, res, next) => {
    // Start a Mongoose session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Destructure user input from request body
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // Conflict
            throw error;
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user within the transaction session
        const newUser = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        // Generate JWT token for the newly created user
        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Commit the transaction once everything is successful
        await session.commitTransaction();
        session.endSession();

        // Respond with success and the generated token
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { token, userId: newUser[0]._id },
        });

    } catch (error) {
        // Roll back transaction in case of any error
        await session.abortTransaction();
        session.endSession();

        // Pass the error to error-handling middleware
        next(error);

       
    }
};



export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, 
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // 4. Return response
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: { token, userId: user._id },
        });


    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}





    export const signOut = async (req, res) => {
        try {
            // For refresh-token based auth: clear cookie
            res.clearCookie('refreshToken'); // if you use httpOnly cookies

            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
