const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

export function getAuthSecret(name: string, developmentFallback: string): string {
  const secret = process.env[name];
  if (secret) return secret;
  if (isProduction) {
    throw new Error(`${name} must be configured in production.`);
  }
  return developmentFallback;
}
