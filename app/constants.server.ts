function validateEnv(key: string): string {
  let value = process.env[key];
  if (!value) throw new Error(`Please define the ${key} environment variable`);
  return value;
}

export const CLOUDINARY_UPLOAD_URL = validateEnv("CLOUDINARY_UPLOAD_URL");
export const CLOUDINARY_URL = validateEnv("CLOUDINARY_URL");
export const CLOUDINARY_CLOUD_NAME = validateEnv("CLOUDINARY_CLOUD_NAME");
export const SESSION_SECRET = validateEnv("SESSION_SECRET");
export const ROOT_DOMAIN = validateEnv("ROOT_DOMAIN");
