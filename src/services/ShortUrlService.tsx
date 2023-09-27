import { http } from '../modules';
import { CreateShortUrlRequest, UpdateShortUrlRequest } from '../types';

const getShortUrls = async (userId: number) => {
  try {
    const response = await http()
      .get(`shorturls?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const createShortUrl = async (payload: CreateShortUrlRequest) => {
  try {
    const response = await http()
      .post(`shorturls`, payload);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const updateShortUrl = async (slug: string, payload: UpdateShortUrlRequest) => {
  try {
    const response = await http()
      .put(`shorturls?slug=${slug}`, payload);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteShortUrl = async (slug: string) => {
  try {
    const response = await http()
      .delete(`shorturls?slug=${slug}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getTopShortUrlStats = async (userId: number) => {
  try {
    const response = await http()
      .get(`shorturls/stats?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const ShortUrlService = {
  getShortUrls,
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
  getTopShortUrlStats,
};