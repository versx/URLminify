import { NextFunction, Request, Response } from 'express';

import { atob, AuthService, UserService } from '../services';

export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token']?.toString();
  //const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    // Allow API key to be passed in query string
    token = req.query['x-access-token']?.toString();
    if (!token) {
      return res.json({
        status: 'error',
        error: 'No token provided!',
      });
    }
  }

  const apiKey = atob(token); // TODO: Possibly use accessTokens
  const decoded = await AuthService.verifyAccessToken(apiKey);
  if (!decoded) {
    return res.json({
      status: 'error',
      error: 'Unauthorized!',
    });
  }

  const nameOrId = decoded?.username ?? decoded?.id;
  const user = await UserService.getUserBy({ username: nameOrId });
  if (!user?.apiKey) {
    return res.json({
      status: 'error',
      error: 'User does not have an API key!',
    });
  }

  if (user?.apiKey !== token) {
    return res.json({
      status: 'error',
      error: 'Invalid API key!',
    });
  }

  try {
    (req as any).user = user;

    // TODO: Check if user is admin
    //if (!(req as any)?.user?.admin) {
    //  return res.json({
    //    status: 'error',
    //    error: 'User is not authorized!',
    //  });
    //}

    next();
  } catch (err) {
    console.error(err);
    return res.json({
      status: 'error',
      error: 'Not authorized!',
    });
  }
};