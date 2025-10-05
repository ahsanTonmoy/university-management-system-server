import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRoutes from './app/modules/users/user.routes';
import  studentRoutes   from "./app/modules/student/student.routes";

const app: Application = express();

// parser
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', studentRoutes);
// application routes

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'welcome to ph univercity server' });
});


//Not Found

export default app;