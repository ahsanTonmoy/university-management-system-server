import { userService } from "./user.service";
import { UserValidationSchema } from "./user.validator";
import { Request, Response } from "express";
const createUser = async (req: Request, res: Response) => {
    try {
        const user = UserValidationSchema.parse(req.body);
        // Logic to create a user in the database
        // Assuming we have a userService that handles database operations
        await userService.createUser(user);
        // This is a placeholder function, implement actual database logic here
        console.log("Creating user:", user);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const userController = {
    createUser,
};