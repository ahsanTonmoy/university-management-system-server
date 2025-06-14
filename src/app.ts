import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// parser
app.use(express.json());



// application routes

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello there, welcome!' });
});


//Not Found

export default app;