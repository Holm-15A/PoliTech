declare module 'passport-line' {
  import { Strategy as PassportStrategy } from 'passport';

  export interface Profile {
    provider: 'line';
    id: string;
    displayName: string;
    email?: string;
    _raw: string;
    _json: {
      userId: string;
      displayName: string;
      pictureUrl?: string;
      statusMessage?: string;
      email?: string;
    };
  }

  export interface StrategyOptions {
    channelID: string;
    channelSecret: string;
    callbackURL: string;
    scope?: string[];
    botPrompt?: 'normal' | 'aggressive';
    uiLocales?: string;
    sessionKey?: string;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => void);
    name: string;
  }
}
