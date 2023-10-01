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

  res.json({ status: 'ok' });
};

export const SettingsController = {
  getSettings,
  setSettings,
};