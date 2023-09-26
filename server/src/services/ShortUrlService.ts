import { ShortUrlAttributes } from '../consts';
import { db } from '../models';
import { randomString } from '../services';
import {
  CreateShortUrlRequest,
  ShortUrlModel,
  UpdateShortUrlRequest,
} from '../types';

const getShortUrls = async (userId?: number | string): Promise<ShortUrlModel[]> => {
  const models = await db.shortUrl.findAll({
    where: !!userId ? { userId } : {},
    attributes: ShortUrlAttributes,
  });
  return models;
};

const getShortUrl = async (slug: string) => {
  const model = await db.shortUrl.findByPk(slug, {
    attributes: ShortUrlAttributes,
  });
  return model;
};

const createShortUrl = async (payload: CreateShortUrlRequest): Promise<ShortUrlModel> => {
  const { name, url, userId } = payload;

  let slug = '';
  if (!!name && name !== '') {
    const model = await getShortUrl(name);
    if (model && userId === model.userId) {
      // Slug name already exists, return model
      return model;
    }
    // Custom slug name is available
    slug = name;
  } else {
    slug = randomString();
  }

  const result = await db.shortUrl.create({
    originalUrl: url,
    slug,
    userId,
  });
  return result;
};

const updateShortUrl = async (slug: string, payload: UpdateShortUrlRequest): Promise<ShortUrlModel | false> => {
  const { url } = payload;
  const model = await getShortUrl(slug);
  if (!model) {
    return false;
  }

  model.set({ originalUrl: url });
  await model.save();
  return model;
};

const deleteShortUrl = async (slug: string): Promise<boolean> => {
  const model = await getShortUrl(slug);
  model?.destroy();
  return true;
};

const isRegisteredByUser = async (userId: number, url: string): Promise<ShortUrlModel> => {
  const model = await db.shortUrl.findOne({
    where: { originalUrl: url, userId },
  });
  return model;
};

export const ShortUrlService = {
  getShortUrl,
  getShortUrls,
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
  isRegisteredByUser,
};