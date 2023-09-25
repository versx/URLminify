import { AuthService, btoa } from '.';
import { ShortUrlAttributes, UserAttributes } from '../consts';
import { db } from '../models';
import { UserModel } from '../types';

const isFreshInstall = async (): Promise<boolean> => {
  const users = await getUsers();
  return users.length === 0;
};

const getUsers = async (): Promise<UserModel[]> => {
  const results = await db.user.findAll({
    attributes: UserAttributes,
    include: {
      model: db.shortUrl,
      as: 'shortUrls',
      attributes: ShortUrlAttributes,
    },
  });
  return results;
};

const getUser = async (id: number) => {
  const result = await db.user.findByPk(id, {
    attributes: UserAttributes,
    include: {
      model: db.shortUrl,
      as: 'shortUrls',
      attributes: ShortUrlAttributes,
    },
  });
  return result;
};

const getUserBy = async (where: any): Promise<UserModel> => {
  const result = await db.user.findOne({
    where,
    attributes: UserAttributes,
    include: {
      model: db.shortUrl,
      as: 'shortUrls',
      attributes: ShortUrlAttributes,
    },
  });
  return result;
};

const createUser = async (user: UserModel, isAdmin: boolean = false): Promise<UserModel | false> => {
  // Check if user with username already exists
  if (await getUserBy({ username: user.username })) {
    return false;
  }

  const accessToken = AuthService.generateAccessToken(user.username);
  const apiKey = btoa(accessToken);

  // Create new user account
  const result = await db.user.create({
    username: user.username,
    password: user.password,
    enabled: true,
    apiKey,
    admin: isAdmin,
  });
  return result;
};

const resetApiKey = async (id: number) => {
  const user = await getUser(id);
  const accessToken = AuthService.generateAccessToken(user.username);
  const apiKey = btoa(accessToken);

  user.set({ apiKey });
  await user.save();
  return true;
};

export const UserService = {
  isFreshInstall,
  getUsers,
  getUser,
  getUserBy,
  createUser,
  resetApiKey,
};