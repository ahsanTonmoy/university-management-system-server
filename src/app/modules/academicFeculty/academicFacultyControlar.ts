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

// get academic faculty responce
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

// get single academic Faculty useing id
const getSingleAcademicFacultyById = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const {id} = req.params;
        const result = await acdemicFacultyService.getSingleAcademicFacultyFromDB(id);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: `${result?.name} Faculty retrieved successfully`,
            data: result
        }
        )
    } catch (error) {
        next(error)
    }
}

// update academic faculty
const updateAcademicFaculty = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const {id} = req.params;
        const result = await acdemicFacultyService.updateAcademicFacultyFromDB(id,req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: `${result?.name} Faculty updated successfully`,
            data: result
        }
        )
    } catch (error) {
        next(error)
    }     
}

// delete academic faculty
const deleteAcademicFaculty = async (req: Request, res:Response, next: NextFunction) =>{{
    try {
        const id = req.params.id;
        const result = await acdemicFacultyService.deleteAcademicFacultyFromDB(id);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: `${result?.name} Faculty deleted successfully`,

        })
    } catch (error) {
        next(error)
    }
}
}

export const academicFacultyControlar = {
    createAcademicFaculty,
    getAcademicFaculty,
    getSingleAcademicFacultyById,
    updateAcademicFaculty,
    deleteAcademicFaculty
}