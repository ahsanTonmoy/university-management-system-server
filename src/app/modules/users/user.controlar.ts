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

// get user by id
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "user retrieved successfully",
            data: user
        })
    } catch (error) {
        next(error);
    }
}

// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const user = await userService.updateUser(id, userData);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "user updated successfully",
            data: user
        })
    } catch (error) {
        next(error);
    }
}

// delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(id);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "user deleted successfully",
            data: user
    })

    } catch (error) {
        next(error);
    }
}
    

export const userController = {
    createStudent,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};