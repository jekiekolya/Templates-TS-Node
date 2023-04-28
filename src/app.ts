import express, { Express, NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

// Import types
import { CustomError } from 'types';

// Import routs
import router from './routes';

// Creates a new Express application
const app: Express = express();

// Set up logger middleware
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

// Set up CORS middleware
app.use(cors({ credentials: true }));

// Set up compression middleware
app.use(compression());

// Set up bodyParser middleware
app.use(bodyParser.json());

// Routers
// Only for creating token (only test)
app.use('/api/auth', router.authRouter);
app.use('/api/orders', router.orderRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Service error' } = err;
  res.status(status).json({
    status,
    message,
  });
});

export default app;
