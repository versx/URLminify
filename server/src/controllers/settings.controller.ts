import { Request, Response } from 'express';

import { SettingsService } from '../services';

const getSettings = async (req: Request, res: Response) => {
  const settings = await SettingsService.getSettings();
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