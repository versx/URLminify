import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import config from '../config.json';
import { StorageKeys } from '../consts';
import { toArr, toObj } from '../modules';
import { SettingsService } from '../services';
import { ServerSettings } from '../types';

export const useServerSettings = () => {
  const [settingsState, setSettingsState] = useState<ServerSettings>(() => {
    const cachedSettings = localStorage.getItem(StorageKeys.ServerSettings);
    return cachedSettings ? JSON.parse(cachedSettings) : null;
  });
  const { enqueueSnackbar } = useSnackbar();

  const setSetting = async (name: string, value: any) => {
    const settingsArr = toArr(settingsState, name, value);
    const response = await SettingsService.setSettings(settingsArr);
    if (response.status !== 'ok') {
      enqueueSnackbar(`Failed to update settings with error: ${response.error}`, { variant: 'error' });
      return;
    }

    const settingsObj = toObj(response.settings);
    setSettingsState(settingsObj);
    enqueueSnackbar(`Updated settings successfully.`, { variant: 'success' });
  };

  //const setSettings = async (settings: ServerSettings) => {
  //  const settingsArr = toArr2(settings);
  //  const response = await SettingsService.setSettings(settingsArr);
  //  if (response.status !== 'ok') {
  //    enqueueSnackbar(`Failed to update settings with error: ${response.error}`, { variant: 'error' });
  //    return;
  //  }

  //  const settingsObj = toObj(response.settings);
  //  setSettingsState(settingsObj);
  //  enqueueSnackbar(`Updated settings successfully.`, { variant: 'success' });
  //};

  const fetchSettings = () => {
    try {
      // Send any metadata like timestamp/version to the server
      fetch(config.apiUrl + 'settings', {
        headers: {
          // Example using ETag
          'If-None-Match': localStorage.getItem(StorageKeys.SettingsETag) as string,
        },
      }).then((response: any) => {
        //console.log('fetchSettings:', response);
        if (response.status !== 200) {
          return;
        }
  
        // Newer version is available
        response.json().then((data: any) => {
          //console.log('fetchSettings json:', data);
          const obj = toObj(data.settings);
          setSettingsState(obj);

          localStorage.setItem(StorageKeys.ServerSettings, JSON.stringify(obj));
          localStorage.setItem(StorageKeys.SettingsETag, response.headers.get('ETag'));
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => fetchSettings(), []);

  //return { settings: settingsState, setSetting, setSettings };
  return { settings: settingsState, setSetting };
};