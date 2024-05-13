
const env = import.meta.env;

export const enviroment = {
  appName: env.VITE_APP_NAME || 'ReactJS + VITE',
  appShortName: env.VITE_APP_SHORT_NAME || 'Rjx',
  apiUrl: env.VITE_API_URL || 'http://localhost:8080',
  minutesInactive: Number(env.VITE_MINUTES_INACTIVE) || 60,
  accessKeyId: env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: env.VITE_AWS_SECRET_ACCESS_KEY,
  region: env.VITE_AWS_REGION
};