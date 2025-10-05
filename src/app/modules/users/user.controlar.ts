import { userService } from "./user.service";
import { UserValidationSchema } from "./user.validator";
import { Request, Response } from "express";
const createStudent = async (req: Request, res: Response) => {
    try {
        // const validatedData = await UserValidationSchema.parseAsync(req.body);
        const {password, student: studentData} = req.body;
    
        const result = await userService.createStudent(password, studentData);
        res.status(200).json({
            success: true,
            message: "New student created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create user",
            error: error instanceof Error ? error.message : error,
        });
    }
}

export const userController = {
    createStudent,
};