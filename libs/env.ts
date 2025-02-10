export const env = {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    BACKEND_API: process.env.BACKEND_API,
    JWT_SECRET: process.env.JWT_SECRET,
} as const;
  
// Validate environment variables
Object.entries(env).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
});