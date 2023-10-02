import { db } from '../models';
import { TelemetryModel } from '../types';

const getTelemetry = async () => {
  const models = await db.shortUrl.findAll();
  return models;
};

const createTelemetry = async (model: TelemetryModel) => {
  const result = await db.telemetry.create(model);
  return result;
};

export const TelemetryService = {
  getTelemetry,
  createTelemetry,
};