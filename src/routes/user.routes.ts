import { Application } from 'express';

import { UsersApiRoute } from '../consts';
import { UserController } from '../controllers';
import { ValidateMiddleware } from '../middleware';

export const UserRouter = (app: Application) => {
  app.use(ValidateMiddleware)
    .route(UsersApiRoute)
      .get(UserController.getUsers)
      .post(UserController.createUser)
      .put(UserController.updateUser)
      .delete(UserController.deleteUser);

  app.get(`${UsersApiRoute}/:id`, UserController.getUser);
  app.post(`${UsersApiRoute}/:id/key/reset`, UserController.resetApiKey);
};