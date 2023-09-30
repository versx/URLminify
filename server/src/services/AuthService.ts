import { compareSync } from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import config from '../config.json';
import { UserService, logError } from '.';
import { DefaultExpiresIn } from '../consts';
import { db } from '../models';

const login = async (username: string, password: string) => {
  try {
    const user = await db.user.findOne({ where: { username } });
    if (!user) {
      return false;
    }

    if (!user.enabled) {
      return false;
    }

    const passwordIsValid = compareSync(password, user.password);
    if (!passwordIsValid) {
      return false;
    }

    return {
      id: user.id,
      username: user.username,
      apiKey: user.apiKey,
      enabled: user.enabled,
      admin: user.admin,
    };
  } catch (err) {
    console.error('login:', err);
    return false;
  }
};

const register = async (username: string, password: string) => {
  try {
    const user = await UserService.createUser({ username, password }, false);
    return !!user;
  } catch (err) {
    console.error('register:', err);
    return false;
  }
};

const generateAccessToken = (username: string): string => {
  const signOptions = { expiresIn: DefaultExpiresIn };
  const accessToken = sign({ username }, config.auth.secret, signOptions);
  return accessToken;
};

const verifyAccessToken = (accessToken: string): Promise<any | false> => new Promise((resolve, reject) => {
  verify(accessToken, config.auth.secret, (err: any, decoded: string | JwtPayload | undefined) => {
    //console.log('decoded:', decoded);

    if (err) {
      logError(err.message);
      return resolve(false);
    }

    //req.userId = decoded?.id;
    return resolve(decoded);
  });
});

const createVerificationCode = () => {
  const verificationCode = randomBytes(32).toString('hex');
  const hashedVerificationCode = createHash('sha256')
    .update(verificationCode)
    .digest('hex');
  return { verificationCode, hashedVerificationCode };
};

export const AuthService = {
  login,
  register,
  generateAccessToken,
  verifyAccessToken,
  createVerificationCode,
};