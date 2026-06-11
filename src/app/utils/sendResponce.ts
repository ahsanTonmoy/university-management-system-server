import { Response } from "express";
// 
type TResponce <T> = {
    statusCode: number,
    success: boolean;
    message?: string;
    data?: T;
};
// send rsesponse to client
export const sendResponse = <T>(res: Response, data: TResponce<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

// send error response to client
export const sendErrorResponse = (res: any, statusCode: number, message: string) => {
  res.status(statusCode).json({ success: false, message });
}