import { Application } from 'express';

import { ShortUrlsApiRoute } from '../consts';
import { ShortUrlController } from '../controllers';
import { ValidateMiddleware } from '../middleware';

export const ShortUrlRouter = (app: Application) => {
  app.get('/:slug', ShortUrlController.getShortUrl);
  
  app.use(ValidateMiddleware)
    .route(ShortUrlsApiRoute)
      .get(ShortUrlController.getShortUrls)
      .post(ShortUrlController.createShortUrl)
      .put(ShortUrlController.updateShortUrl)
      .delete(ShortUrlController.deleteShortUrl);
};