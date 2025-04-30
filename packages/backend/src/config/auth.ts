import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as AppleStrategy } from 'passport-apple';
import { PrismaClient } from '@prisma/client';
import { Strategy as LineStrategy, Profile as LineProfile } from 'passport-line';

const prisma = new PrismaClient();

type DoneFunction = (error: any, user?: any) => void;

export const configureAuth = (passport: PassportStatic) => {
  passport.serializeUser((user: any, done: DoneFunction) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: DoneFunction) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  });

  // Google認証
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    }, async (accessToken: string, refreshToken: string, profile: any, done: DoneFunction) => {
      try {
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'google',
                providerAccountId: profile.id
              }
            }
          }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0]?.value ?? '',
              name: profile.displayName,
              accounts: {
                create: {
                  type: 'oauth',
                  provider: 'google',
                  providerAccountId: profile.id,
                  access_token: accessToken,
                  refresh_token: refreshToken
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }));
  }

  // Facebook認証
  if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email']
    }, async (accessToken: string, refreshToken: string, profile: any, done: DoneFunction) => {
      try {
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'facebook',
                providerAccountId: profile.id
              }
            }
          }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0]?.value ?? '',
              name: profile.displayName,
              accounts: {
                create: {
                  type: 'oauth',
                  provider: 'facebook',
                  providerAccountId: profile.id,
                  access_token: accessToken,
                  refresh_token: refreshToken
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }));
  }

  // Twitter認証
  if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
    passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: '/auth/twitter/callback'
    }, async (token: string, tokenSecret: string, profile: any, done: DoneFunction) => {
      try {
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'twitter',
                providerAccountId: profile.id
              }
            }
          }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0]?.value ?? '',
              name: profile.displayName,
              accounts: {
                create: {
                  type: 'oauth',
                  provider: 'twitter',
                  providerAccountId: profile.id,
                  access_token: token,
                  refresh_token: tokenSecret
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }));
  }

  // LINE認証
  if (process.env.LINE_CLIENT_ID && process.env.LINE_CLIENT_SECRET) {
    passport.use(new LineStrategy({
      channelID: process.env.LINE_CLIENT_ID,
      channelSecret: process.env.LINE_CLIENT_SECRET,
      callbackURL: '/auth/line/callback'
    }, async (accessToken: string, refreshToken: string, profile: LineProfile, done: DoneFunction) => {
      try {
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'line',
                providerAccountId: profile.id
              }
            }
          }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email ?? '',
              name: profile.displayName,
              accounts: {
                create: {
                  type: 'oauth',
                  provider: 'line',
                  providerAccountId: profile.id,
                  access_token: accessToken,
                  refresh_token: refreshToken
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }));
  }

  // Apple認証
  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
    passport.use(new AppleStrategy({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID || '',
      keyID: process.env.APPLE_KEY_ID || '',
      privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION || '',
      callbackURL: '/auth/apple/callback',
      passReqToCallback: false
    }, async (accessToken: string, refreshToken: string, idToken: string, profile: any, done: DoneFunction) => {
      try {
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'apple',
                providerAccountId: profile.id
              }
            }
          }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email ?? '',
              name: `${profile.name?.firstName ?? ''} ${profile.name?.lastName ?? ''}`.trim(),
              accounts: {
                create: {
                  type: 'oauth',
                  provider: 'apple',
                  providerAccountId: profile.id,
                  access_token: accessToken,
                  refresh_token: refreshToken,
                  id_token: idToken
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }));
  }
};