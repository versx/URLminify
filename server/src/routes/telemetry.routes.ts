import { Application } from 'express';

import { TelemetryApiRoute } from '../consts';
import { TelemetryController } from '../controllers';
import { AdminMiddleware, ValidateMiddleware } from '../middleware';

export const TelemetryRouter = (app: Application) => {
  app.use(AdminMiddleware, ValidateMiddleware)
    .route(TelemetryApiRoute)
      .get(TelemetryController.getTelemetryData);
};