import { NextFunction, Request, Response } from "express";
import { acdemicFecultyService } from "./academicFecultyService";
import { sendResponse } from "../../utils/sendResponce";
import  httpStatus  from 'http-status';

// create acdemic feculty responce
const createAcademicFeculty = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const result = await acdemicFecultyService.createAcedemicFecultyFromDB(req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic feculty create successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const academicFecultyControlar = {
    createAcademicFeculty
}