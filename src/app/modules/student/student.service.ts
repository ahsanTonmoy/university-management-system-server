import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const getStudents = async (): Promise<IStudent[]> => {
    const students = await Student.find().populate('user');
    return students;
}

const getStudentById = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findById(id).populate('user');
    return student;
}

const updateStudent = async (id: string, studentData: Partial<IStudent>): Promise<IStudent | null> => {
    const student = await Student.findByIdAndUpdate(id, studentData, { new: true }).populate('user');
    return student;
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findByIdAndDelete(id);
    return student;
}


export const studentService = {
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};