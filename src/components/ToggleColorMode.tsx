import React, { useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from '../App';
import { ColorModeContext } from '../contexts';
import { get, set } from '../modules';
import { ThemeColorMode } from '../types';

// Reference: https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
export const ToggleColorMode = () => {
  const cachedMode = get('colorMode', 'light');
  const [mode, setMode] = useState<ThemeColorMode>(cachedMode);
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        set('colorMode', newMode);
        return newMode;
      });
    },
    mode,
  }), [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};