import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponce";
import { academicSemesterService } from "./academicSemesterServices";
import HttpStatus from "http-status";
// create academic semester 
const createAcademicSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await academicSemesterService.createAcademicSemesterToDB(req.body);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            data: result,
            message: "Academic Semester created successfully"
        });
    } catch (error) {
        next(error);
    }
}

// get all academic semesters from database
const getAcademicSemesters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await academicSemesterService.getAcademicSemestersFromDB();
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Academic Semesters retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// get single academic semester from database
const getAcademicSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await academicSemesterService.getAcademicSemesterFromDB(id as string);
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Academic Semester retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// update academic samester
const updateAcademicSemester =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await academicSemesterService.updateAcademicSemesterFromDB(id as string,req.body)
        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "Academic Semester update successfully",
            data: result,
        }

    )
    } catch (error) {
        next(error)
    }
}


// delete academic semester 
const deleteAcademicSemester =  async (req: Request, res: Response, next: NextFunction) =>{
   try {
    const id = req.params.id;
    const result = await academicSemesterService.deleteAcademicSemesterFromDB(id as string);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'academic semester delete successfuly',
        data: result
    })
   } catch (error) {
    next(error)
   }
}

export const academicSemesterController = {
    createAcademicSemester,
    getAcademicSemesters,
    getAcademicSemester,
    updateAcademicSemester,
    deleteAcademicSemester
}