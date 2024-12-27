import './config/instrument.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { webhookController } from './controllers/clerkWebhook.controller.js';
import companyRouter from './routes/company.routes.js';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.post('/webhook', webhookController);

app.use('/api/v1/company', companyRouter);

Sentry.setupExpressErrorHandler(app);

export { app };
