import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFoundHandler } from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());



// application routes
app.use('/api', router);

//
app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'welcome to ph univercity server' });
});

// global error handler
app.use(globalErrorHandler);
// not found handler
app.use(notFoundHandler);

export default app;