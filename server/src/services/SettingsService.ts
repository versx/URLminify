import { db } from '../models';
import { SettingModel } from '../types';

const getSettings = async (): Promise<SettingModel[]> => {
  const models = await db.setting.findAll();
  return models;
};

const getSetting = async (name: string): Promise<SettingModel> => {
  const model = await db.setting.findByPk(name);
  return model;
};

const setSetting = async (name: string, value: string): Promise<boolean> => {
  const model = await db.setting.findByPk(name);
  if (!model) {
    return false;
  }

  try {
    model.set({ value });
    await model.save();
    return true;
  } catch (err) {
    return false;
  }
};

export const SettingsService = {
  getSettings,
  getSetting,
  setSetting,
};