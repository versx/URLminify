import { Application } from 'express';

import { SettingsApiRoute } from '../consts';
import { SettingsController } from '../controllers';
import { AdminMiddleware, ValidateMiddleware } from '../middleware';

export const SettingsRouter = (app: Application) => {
  app.use(AdminMiddleware, ValidateMiddleware)
    .route(SettingsApiRoute)
      .get(AdminMiddleware, SettingsController.getSettings)
      .put(AdminMiddleware, SettingsController.setSetting);
};