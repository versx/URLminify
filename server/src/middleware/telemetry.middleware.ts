import { NextFunction, Request, Response } from 'express';

import { SettingKeys } from '../consts';
import {
  getExternalIpAddress,
  getGeolocationDetails,
  logDebug,
  logError,
  SettingsService,
  ShortUrlService,
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
  const exists = await ShortUrlService.getShortUrl(slug);
  if (!exists) {
    logDebug(`Slug '${slug}' does not exist. Skipping telemetry.`);
    return next();
  }

  try {
    //const ipAddr = await getIpAddress(req);
    const ipAddr = await getExternalIpAddress();
    const geolocation = await getGeolocationDetails(ipAddr);
    if (ipAddr === '0.0.0.0' || !geolocation) {
      logDebug(`Unable to obtain IP address or geolocation details. Skipping telemetry.`);
      return next();
    }

    const defaultValue = 'Unknown';
    const browser = req.get('user-agent') ?? defaultValue;
    const referrer = req.get('referrer') ?? req.get('referer') ?? null;
    const forwardedFor = req.get('x-forwarded-for') ?? null;
    const language = req.get('accept-language') ?? defaultValue;
    const country = req.get('cf-ipcountry') ?? geolocation?.country ?? defaultValue;
    const district = req.get('cf-ipcity') ?? geolocation?.district === ''
      ? defaultValue
      : geolocation?.district ?? defaultValue;
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
      offset: geolocation?.offset ? geolocation?.offset / 60 / 60 : 0,
      country,
      district,
      mobile,
    });
  } catch (err) {
    logError(err);
  }

  next();
};