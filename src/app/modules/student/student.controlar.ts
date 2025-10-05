import { studentService } from "./student.service";
import { Request, Response } from "express";

const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await studentService.getStudents();
        res.status(200).json({
            success: true,
            message: "Students retrieved successfully",
            data: students,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve students",
            error: error instanceof Error ? error.message : error,
        });
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
