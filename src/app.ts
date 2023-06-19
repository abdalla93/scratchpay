import 'reflect-metadata';
import swaggerJsDoc from 'swagger-jsdoc';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middlewares';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);
