import { Request, Response } from 'express';

import config from '../config.json';
import { isValidUrl, ShortUrlService } from '../services';
import {
  CreateShortUrlRequest, CreateShortUrlResponse,
  UpdateShortUrlRequest, UpdateShortUrlResponse,
} from '../types';

const getShortUrls = async (req: Request, res: Response) => {
  const { pretty = false } = req.query;
  req.app.set('json spaces', pretty === 'true' ? 2 : 0);

  const results = await ShortUrlService.getShortUrls();
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
      error: `Slug not specified!`,
    });
  }

  const shortUrl = await ShortUrlService.getShortUrl(slug);
  if (!shortUrl) {
    return res.json({
      status: 'error',
      message: 'Slug not found',
    });
  }

  res.redirect(shortUrl.originalUrl);

  await shortUrl.increment({ 'visits': 1 });
};

const createShortUrl = async (req: Request, res: Response) => {
  const payload: CreateShortUrlRequest = req.body;
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
      shortUrl: existing,
    });
  }

  const result = await ShortUrlService.createShortUrl(payload);
  res.json({
    status: !result ? 'error' : 'ok',
    error: !result ? 'Slug already exists!' : undefined,
    shortUrl: !result ? undefined : {
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
      error: `Slug not specified!`,
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
      error: 'No slug provided!',
    });
  }

  const result = await ShortUrlService.deleteShortUrl(slugName);
  if (!result) {
    return res.json({
      status: 'error',
      error: 'Failed to delete slug',
    });
  }

  res.json({ status: 'ok' });
};

//const test = async (req: Request, res: Response) => {
//  const payload: CreateShortUrlRequest | any = req.query;
//  if (!payload.url) {
//    return res.json({
//      status: 'error',
//      error: 'The given URL must not be null.',
//    });
//  }
//
//  if (!isValidUrl(payload.url)) {
//    return res.json({
//      status: 'error',
//      error: 'The given URL is not valid.',
//    });
//  }
//
//  const existing = await ShortUrlService.isRegisteredByUser(payload.userId, payload.url);
//  if (!!existing) {
//    return res.json({
//      status: 'ok',
//      shortUrl: existing,
//    });
//  }
//
//  const result = await ShortUrlService.createShortUrl(payload);
//  res.json({
//    status: !result ? 'error' : 'ok',
//    error: !result ? 'Slug already exists!' : undefined,
//    shortUrl: !result ? undefined : {
//      url: `${config.domain}/${result.slug}`,
//      slug: result.slug,
//      userId: result.userId,
//    },
//    originalUrl: result.originalUrl,
//  } as CreateShortUrlResponse);
//};

export const ShortUrlController = {
  createShortUrl,
  getShortUrl,
  getShortUrls,
  updateShortUrl,
  deleteShortUrl,
  //test,
};