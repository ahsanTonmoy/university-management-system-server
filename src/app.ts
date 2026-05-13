import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import userRoutes from './app/modules/users/user.routes';
import  studentRoutes   from "./app/modules/student/student.routes";
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parser
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', studentRoutes);
// application routes

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'welcome to ph univercity server' });
});

// global error handler
app.use(globalErrorHandler);


export default app;