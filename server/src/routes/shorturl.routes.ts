import { Application } from 'express';

import { ShortUrlsApiRoute } from '../consts';
import { ShortUrlController } from '../controllers';
import { TelemetryMiddleware, ValidateMiddleware } from '../middleware';

export const ShortUrlRouter = (app: Application) => {
  app.get('/:slug', TelemetryMiddleware, ShortUrlController.getShortUrl);

  app.use(ValidateMiddleware)
    .route(ShortUrlsApiRoute)
      .get(ShortUrlController.getShortUrls)
      .post(ShortUrlController.createShortUrl)
      .put(ShortUrlController.updateShortUrl)
      .delete(ShortUrlController.deleteShortUrl);

  app.get(ShortUrlsApiRoute + '/create', ShortUrlController.createShortUrl);
  app.get(ShortUrlsApiRoute + '/stats', ShortUrlController.getShortUrlsStats);
};