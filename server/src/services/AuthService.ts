import { createHash, randomBytes } from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { logError } from '.';
import { DefaultExpiresIn } from '../consts';
import config from '../config.json';
import { db } from '../models';

const login = async (username: string, password: string) => {
  const user = await db.user.findOne({ username });
  console.log('login:', user);
  // TODO: Properly check password
  if (user.password === password) {
    return true;
  }
  return false;
};

const register = () => {

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