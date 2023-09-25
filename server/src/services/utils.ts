import { ColorType } from '../types';

// 5 - ukhndyw
// 6 - lktajej
// 7 - 3teb8
// 8 - k0fd
export const randomString = (seed: number = 7) => (Math.random() + 1).toString(36).substring(seed);

export const atob = (encoded: any) => Buffer.from(encoded, 'base64').toString('utf-8');
export const btoa = (decoded: any) => Buffer.from(decoded).toString('base64');

export const isValidUrl = (url: string | null) => {
  if (!url) {
    return false;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  return true;
};

export const color = (color: ColorType, message: any) => {
  const clr = typeToColor(color); //config.logs.colors[color];
  const ctrlChar = '\x1b';
  const start = ctrlChar + clr;
  const end = ColorCodes.Reset;
  const result = `${start}${message}${end}`;
  return result;
};

export const typeToColor = (type: ColorType) => {
  switch (type) {
    case 'date': return ColorCodes.FgCyan;
    case 'error': return ColorCodes.FgRed;
    case 'text': return ColorCodes.FgGray;
    case 'variable': return ColorCodes.FgBlue;
    case 'warn': return ColorCodes.FgYellow;
    default: return ColorCodes.FgGray;
  }
};

export const ColorCodes = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  FgGray: '\x1b[90m',
  
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
  BgGray: '\x1b[100m',
};