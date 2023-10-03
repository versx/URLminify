import { Request, Response } from 'express';

import { generateETag, SettingsService } from '../services';
import { SettingModel } from '../types';

let settings: SettingModel[] = [];

const getSettings = async (req: Request, res: Response) => {
  const clientETag = req.header('If-None-Match');
  const currentETag = generateETag(settings);
  console.log('getSettings:', clientETag, currentETag);

  // Compare client's ETag with current ETag
  if (clientETag === currentETag) {
    console.log('settings have not changed');
    res.status(304).end(); // No changes, send Not Modified
    return;
  }

  console.log('new settings to reload');
  res.setHeader('ETag', currentETag); // Send new ETag
  // Send updated resource
  settings = await SettingsService.getSettings();
  res.json({
    status: 'ok',
    settings,
  });
};

const setSettings = async (req: Request, res: Response) => {
  const { settings } = req.body;
  const result = await SettingsService.setSettings(settings);
  if (!result) {
    return res.json({
      status: 'error',
      error: `Failed to set settings '${settings}'`,
    });
  }

  const newSettings = await SettingsService.getSettings();
  res.json({ status: 'ok', settings: newSettings });
};

export const SettingsController = {
  getSettings,
  setSettings,
};