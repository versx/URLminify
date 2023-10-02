import { NextFunction, Request, Response } from 'express';

import { SettingKeys } from '../consts';
import {
  getGeolocationDetails,
  getIpAddress,
  logError,
  SettingsService,
  TelemetryService,
} from '../services';

export const TelemetryMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Cache settings
  const enableTelemetry = await SettingsService.getSetting(SettingKeys.EnableTelemetry);
  const enabled = parseInt(enableTelemetry?.value) !== 0 ?? false;
  if (!enabled) {
    return next();
  }

  const { slug } = req.params;

  try {
    const ipAddr = await getIpAddress(req);
    const geolocation = await getGeolocationDetails(ipAddr);
    const browser = req.get('user-agent') ?? null;
    const referrer = req.get('referrer') ?? req.get('referer') ?? null;
    const forwardedFor = req.get('x-forwarded-for') ?? null;
    const language = req.get('accept-language') ?? null;
    const country = req.get('cf-ipcountry') ?? geolocation?.country ?? null;
    const district = req.get('cf-ipcity') ?? geolocation?.district === ''
      ? null
      : geolocation?.district ?? null;
    const mobile = req.get('cf-device-type')
      ? req.get('cf-device-type') === 'mobile'
      : geolocation?.mobile ?? false;
  
    TelemetryService.createTelemetry({
      ...geolocation,
      slug,
      ipAddr,
      browser,
      referrer,
      forwardedFor,
      language,
      offsetSeconds: geolocation.offset,
      offset: geolocation.offset / 60 / 60,
      country,
      district,
      mobile,
    });
  } catch (err) {
    logError(err);
  }

  next();
};