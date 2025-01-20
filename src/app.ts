import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// apllication routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Running!');
});

export default app;
