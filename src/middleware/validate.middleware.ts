import { NextFunction, Request, Response } from 'express';

import { atob, AuthService, UserService } from '../services';

export const ValidateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token']?.toString();
  if (!token) {
    return res.json({
      status: 'error',
      error: 'No token provided!',
    });
  }

  const apiKey = atob(token);
  const decoded = await AuthService.verifyAccessToken(apiKey);
  //console.log('decoded:', decoded);
  if (!decoded) {
    return res.json({
      status: 'error',
      error: 'Unauthorized!',
    });
  }

  const user = await UserService.getUserBy({ username: decoded?.username ?? decoded?.id });
  if (user?.apiKey !== token) {
    return res.json({
      status: 'error',
      error: 'Invalid API key.',
    });
  }

  next();
};