import { NextFunction , Request ,Response} from "express";
import { facultyService } from "./faculty.service";
import { sendResponse } from "../../utils/sendResponce";
import  httpStatus  from 'http-status';

// get all facultise
const getAllFaculty = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const result = await facultyService.getAllFaculty(req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message:  "faculties retrieved successfully",
            length: result.length,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const facultyControlar = {
    getAllFaculty
}