import express from 'express';

import config from './config.json';
import { db, testConnection } from './models';
import { ApiRouter } from './routes';
import { UserService, color, log } from './services';

(async () => {
  // Test database connection
  await testConnection();

  // Synchronize database tables
  await db.connection.sync({
    force: false,
    alter: true,
  });

  // Seed admin account if fresh install
  if (await UserService.isFreshInstall()) {
    await UserService.createUser(config.auth.admin, true);
  }

  // Initialize HTTP server
  const app = express();

  // Initialize routes
  ApiRouter(app);

  // Start listening
  app.listen(config.port, config.host, () => {
    log(`Listening at ${color('variable', `http://${config.host}:${config.port}`)}`);
  });
})();