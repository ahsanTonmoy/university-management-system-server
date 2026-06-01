// validedeRequest 
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodSchema } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
            });
            console.log('check')
            next();
        } catch (error) {
            next(error);
        }
    };
};
