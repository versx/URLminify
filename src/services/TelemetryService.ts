import { http } from '../modules';

const getTelemetry = async () => {
  try {
    const response = await http()
      .get('telemetry');
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const TelemetryService = {
  getTelemetry,
};