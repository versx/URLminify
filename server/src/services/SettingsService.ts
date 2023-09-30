import { db } from '../models';

const getSettings = async () => {
  const models = await db.setting.findAll();
  return models;
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
  setSetting,
};