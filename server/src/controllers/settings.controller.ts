import { Request, Response } from 'express';

import { SettingsService } from '../services';

const getSettings = async (req: Request, res: Response) => {
  const settings = await SettingsService.getSettings();
  res.json({
    status: 'ok',
    settings,
  });
};

const setSetting = async (req: Request, res: Response) => {
  console.log('setSetting:', req.body);
  const { name, value } = req.body;
  const result = await SettingsService.setSetting(name, value);
  if (!result) {
    return res.json({
      status: 'error',
      error: `Failed to set setting '${name}' to '${value}'`,
    });
  }

  res.json({ status: 'ok' });
};

export const SettingsController = {
  getSettings,
  setSetting,
};