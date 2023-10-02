import { Request, Response } from 'express';

import { TelemetryService } from '../services';

const getTelemetryData = async (req: Request, res: Response) => {
  const telemetry = await TelemetryService.getTelemetry();
  res.json({
    status: 'ok',
    telemetry,
  });
};

export const TelemetryController = {
  getTelemetryData,
};