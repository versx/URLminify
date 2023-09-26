import { Request, Response } from 'express';

import { AuthService } from '../services';

const login = async (req: Request, res: Response) => {
  console.log('login:', req.body);
  const { username, password } = req.body;
  const result = await AuthService.login(username, password);
  if (!result) {
    return res.json({
      status: 'error',
      error: `Failed to login.`,
    });
  }

  res.json({
    status: 'ok',
  });
};

const register = (req: Request, res: Response) => {
  console.log('register:', req.body);
};

export const AuthController = {
  login,
  register,
};