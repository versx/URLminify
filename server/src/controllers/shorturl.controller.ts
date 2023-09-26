import { Request, Response } from 'express';

import config from '../config.json';
import { isValidUrl, ShortUrlService } from '../services';
import {
  CreateShortUrlRequest, CreateShortUrlResponse,
  UpdateShortUrlRequest, UpdateShortUrlResponse,
} from '../types';

const getShortUrls = async (req: Request, res: Response) => {
  const { pretty = false, userId } = req.query;
  req.app.set('json spaces', pretty === 'true' ? 2 : 0);

  const results = await ShortUrlService.getShortUrls(userId?.toString());
  res.json({
    status: 'ok',
    shortUrls: results,
  });
};

const getShortUrl = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    return res.json({
      status: 'error',
      error: `Slug is not defined!`,
    });
  }

  const shortUrl = await ShortUrlService.getShortUrl(slug);
  if (!shortUrl) {
    return res.json({
      status: 'error',
      message: 'Slug does not exist.',
    });
  }

  res.redirect(shortUrl.originalUrl);
  await shortUrl.increment({ visits: 1 });
};

const createShortUrl = async (req: Request, res: Response) => {
  const payload: CreateShortUrlRequest = !!req.body?.url ? req.body : req.query;
  if (!isValidUrl(payload.url)) {
    return res.json({
      status: 'error',
      error: 'The given URL is not valid.',
    });
  }

  const existing = await ShortUrlService.isRegisteredByUser(payload.userId, payload.url);
  if (!!existing) {
    return res.json({
      status: 'ok',
      shortUrl: {
        url: `${config.domain}/${existing.slug}`,
        slug: existing.slug,
        userId: existing.userId,
      },
      originalUrl: existing.originalUrl,
    });
  }

  const result = await ShortUrlService.createShortUrl(payload);
  if (!result) {
    return res.json({
      status: 'error',
      error: 'Slug already exists!',
    });
  }

  res.json({
    status: 'ok',
    shortUrl: {
      url: `${config.domain}/${result.slug}`,
      slug: result.slug,
      userId: result.userId,
    },
    originalUrl: result.originalUrl,
  } as CreateShortUrlResponse);
};

const updateShortUrl = async (req: Request, res: Response) => {
  const { slug } = req.query;
  if (!slug) {
    return res.json({
      status: 'error',
      error: `Slug is not defined!`,
    });
  }

  const slugName = slug.toString();
  const payload: UpdateShortUrlRequest = req.body;
  const result = await ShortUrlService.updateShortUrl(slugName, payload);
  if (!result) {
    return res.json({
      status: 'error',
      error: `Failed to update short url.`,
    });
  }

  res.json({
    status: 'ok',
    shortUrl: {
      url: `${config.domain}/${result.slug}`,
      slug: result.slug,
      userId: result.userId,
    },
    originalUrl: result.originalUrl,
  } as UpdateShortUrlResponse);
};

const deleteShortUrl = async (req: Request, res: Response) => {
  const { slug } = req.query;
  const slugName = slug?.toString();
  if (!slugName) {
    return res.json({
      status: 'error',
      error: `Slug is not defined!`,
    });
  }

  const result = await ShortUrlService.deleteShortUrl(slugName);
  if (!result) {
    return res.json({
      status: 'error',
      error: 'Failed to delete short url.',
    });
  }

  res.json({ status: 'ok' });
};

export const ShortUrlController = {
  createShortUrl,
  getShortUrl,
  getShortUrls,
  updateShortUrl,
  deleteShortUrl,
};