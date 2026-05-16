import { sendResponse } from "../../utils/sendResponce";
import { studentService } from "./student.service";
import { NextFunction, Request, Response } from "express";
import  HttpStatus  from 'http-status';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // get all students from database
        const students = await studentService.getStudents();
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
// const getStudentById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const student = await studentService.getStudentById(id);\
//     if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(student);
// }
// const updateStudent = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const studentData = req.body;
//     const student = await studentService.updateStudent(id, studentData);
//     if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(student);
// }
// const deleteStudent = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const student = await studentService.deleteStudent(id);
//     if (!student) {
//         return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json({ message: 'Student deleted successfully' });
// }
export const studentController = {
    getStudents,
    // getStudentById,
    // updateStudent,
    // deleteStudent
};
