import cors from 'cors';
import express from 'express';
import { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
