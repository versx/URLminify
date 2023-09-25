import express from 'express';

import { auth, host, port } from './config.json';
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
    await UserService.createUser(auth.admin, true);
  }

  // Initialize HTTP server
  const app = express();

  // Initialize routes
  ApiRouter(app);

  // Start listening
  app.listen(port, host, () => {
    log(`Listening at ${color('variable', `http://${host}:${port}`)}`);
  });
})();