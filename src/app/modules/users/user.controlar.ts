import { sendResponse } from "../../config/utils/sendResponce";
import { userService } from "./user.service";
import { UserValidationSchema } from "./user.validator";
import { NextFunction, Request, Response } from "express";
import  HttpStatus  from 'http-status';
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const validatedData = await UserValidationSchema.parseAsync(req.body);
        const {password, student: studentData} = req.body;
    
        const result = await userService.createStudent(password, studentData);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "New student created successfully",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}

export const userController = {
    createStudent,
};