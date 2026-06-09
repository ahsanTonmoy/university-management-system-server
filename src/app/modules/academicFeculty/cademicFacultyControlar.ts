import { NextFunction, Request, Response } from "express";
import { acdemicFacultyService } from "./academicFacultyService";
import { sendResponse } from "../../utils/sendResponce";
import  httpStatus  from 'http-status';

// create academic faculty responce
const createAcademicFaculty = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const result = await acdemicFacultyService.createAcedemicFacultyFromDB(req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic faculty create successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// create academic faculty responce
const getAcademicFaculty =  async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const academicFaculty = await acdemicFacultyService.getAcademicFacultyFromDB();
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculties retrieved successfully",
            data: academicFaculty
        })
    } catch (error) {
        next(error)
    }
}

export const academicFacultyControlar = {
    createAcademicFaculty,
    getAcademicFaculty
}