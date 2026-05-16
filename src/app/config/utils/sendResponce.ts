import { Response } from "express";
// 
type TResponce <T> = {
    statusCode: number,
  success: boolean;
  data?: T;
  message?: string;
};
// send rsesponse to client
export const sendResponse = <T>(res: Response, data: TResponce<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    data: data.data,
    message: data.message
  });
};

// send error response to client
export const sendErrorResponse = (res: any, statusCode: number, message: string) => {
  res.status(statusCode).json({ success: false, message });
}