const DEFAULT_DEV_API_URL = 'http://localhost:5000';
const DEFAULT_PROD_API_URL = 'https://portfolio2-0-5bu0.onrender.com';

const PLACEHOLDER_SEGMENTS = [
  'your-backend-url',
  'your-backend-api-url',
  'example.com'
];

const normalizeUrl = (value) => value?.trim().replace(/\/$/, '');

const isPlaceholderUrl = (value) => {
  if (!value) {
    return false;
  }

  return PLACEHOLDER_SEGMENTS.some((segment) => value.includes(segment));
};

export const getApiBaseUrl = () => {
  const configuredUrl = normalizeUrl(import.meta.env.VITE_API_URL);

  if (configuredUrl && !isPlaceholderUrl(configuredUrl)) {
    return configuredUrl;
  }

  return import.meta.env.PROD ? DEFAULT_PROD_API_URL : DEFAULT_DEV_API_URL;
};
