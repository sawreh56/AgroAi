import Config from 'react-native-config';

const required = {
  FIREBASE_API_KEY: Config.FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID: Config.FIREBASE_PROJECT_ID,
};

function assertRequired() {
  if (process.env.NODE_ENV !== 'production') {
    const missing = Object.keys(required).filter((k) => !required[k]);
    if (missing.length) {
      // eslint-disable-next-line no-console
      console.warn(`Missing env vars: ${missing.join(', ')} — copy .env.example → .env and fill values`);
    }
  }
}

assertRequired();

export const API_URL = Config.REACT_NATIVE_API_URL || '';
export const REACT_NATIVE_API_KEY = Config.REACT_NATIVE_API_KEY || '';
export const GOOGLE_API_KEY = Config.GOOGLE_API_KEY || '';
export const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY || '';
export const FIREBASE_API_KEY = Config.FIREBASE_API_KEY || '';
export const FIREBASE_PROJECT_ID = Config.FIREBASE_PROJECT_ID || '';
export const FIREBASE_STORAGE_BUCKET = Config.FIREBASE_STORAGE_BUCKET || '';
export const FIREBASE_APP_ID = Config.FIREBASE_APP_ID || '';
export const SENTRY_DSN = Config.SENTRY_DSN || '';
export const STRIPE_PUBLISHABLE_KEY = Config.STRIPE_PUBLISHABLE_KEY || '';
export const S3_BUCKET = Config.S3_BUCKET || '';
export const S3_REGION = Config.S3_REGION || '';
export const NODE_ENV = Config.NODE_ENV || 'development';

export default {
  API_URL,
  REACT_NATIVE_API_KEY,
  GOOGLE_API_KEY,
  GOOGLE_MAPS_API_KEY,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  SENTRY_DSN,
  STRIPE_PUBLISHABLE_KEY,
  S3_BUCKET,
  S3_REGION,
  NODE_ENV,
};
