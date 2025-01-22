import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// apllication routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Running!');
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
