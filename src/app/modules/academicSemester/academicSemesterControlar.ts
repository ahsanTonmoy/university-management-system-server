import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponce";
import { academicSemesterService } from "./academicSemesterServices";
// create academic semester 
const createAcademicSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await academicSemesterService.createAcademicSemesterToDB(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result,
            message: "Academic Semester created successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const academicSemesterController = {
    createAcademicSemester,
}