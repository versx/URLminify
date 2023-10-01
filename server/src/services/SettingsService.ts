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

const setSettings = async (settings: any[]): Promise<boolean> => {
  let error = false;
  for (const setting of settings) {
    const model = await db.setting.findByPk(setting.name);
    if (!model) {
      db.setting.create(setting);
      continue;
    }
  
    try {
      model.set(setting);
      await model.save();
    } catch (err) {
      console.error(err);
      error = true;
    }
  }
  return !error;
};

export const SettingsService = {
  getSettings,
  getSetting,
  setSettings,
};