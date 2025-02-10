declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_APP_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        FACEBOOK_CLIENT_ID: string;
        FACEBOOK_CLIENT_SECRET: string;
        BACKEND_API: string;
        JWT_SECRET: string;
    }
};