import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';

import { AuthRouter } from './auth.routes';
import { SettingsRouter } from './settings.routes';
import { ShortUrlRouter } from './shorturl.routes';
import { TelemetryRouter } from './telemetry.routes';
import { UserRouter } from './user.routes';
import { LoggingMiddleware } from '../middleware';

export const ApiRouter = (app: Application) => {
  // Initialize helmet basic security middleware
  app.use(helmet());

  // Body method parsers
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));

  // Middlewares
  app.use(LoggingMiddleware);

  // Initialize auth routes
  AuthRouter(app);

  // Initialize settings routes
  SettingsRouter(app);

  // Initialize short url routes
  ShortUrlRouter(app);

  // Initialize user routes
  UserRouter(app);

  // Initialize telemetry routes
  TelemetryRouter(app);
};