import { sendResponse } from "../../utils/sendResponce";
import { studentService } from "./student.service";
import { NextFunction, Request, Response } from "express";
import  HttpStatus  from 'http-status';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query)
        // get all students from database
        const students = await studentService.getStudents(req.query);
        // send response to client
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            data: students,
            message: "Students retrieved successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

// find student using id
const findStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const student = await studentService.getStudentById(id);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            data: student,
            message: "Student retrieved successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

// update student info
const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const studentData = req.body.student;
        const student = await studentService.updateStudent(id, studentData);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            data: student,
            message: "Student updated successfully"
        });
    }
    catch (error) {
        next(error);
    }       
}

// DELETE STUDENT   
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id= req.params.id;
        const student = await studentService.deleteStudent(id);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            data: student,
            message: "Student deleted successfully"

        });

    }
    catch(error){
        next(error);
    }
}

// student controlar
export const studentController = {
    getStudents,
    findStudentById,
    updateStudent,
    deleteStudent
};
