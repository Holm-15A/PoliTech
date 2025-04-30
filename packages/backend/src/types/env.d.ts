declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE_URL: string;
    FRONTEND_URL: string;
    AUTH_SECRET: string;
    
    // Google OAuth
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    
    // Facebook OAuth
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    
    // Twitter OAuth
    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
    
    // LINE OAuth
    LINE_CLIENT_ID: string;
    LINE_CLIENT_SECRET: string;
    
    // Apple OAuth
    APPLE_CLIENT_ID: string;
    APPLE_CLIENT_SECRET: string;
    APPLE_TEAM_ID: string;
    APPLE_KEY_ID: string;
    APPLE_PRIVATE_KEY_LOCATION: string;
  }
}