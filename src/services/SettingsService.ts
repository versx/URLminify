import { http } from '../modules';

const getSettings = async () => {
  try {
    const response = await http()
      .get('settings');
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const setSetting = async <T>(name: string, value: T) => {
  try {
    const response = await http()
      .put('settings', { name, value });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const SettingsService = {
  getSettings,
  setSetting,
};