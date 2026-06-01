import { sendResponse } from "../../utils/sendResponce";
import { createStudentZodSchema } from "../student/studentVelidetion";
import { userService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import  HttpStatus  from 'http-status';
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

// get all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers();
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "users retrieved successfully",
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const userController = {
    createStudent,
    getUsers,
};