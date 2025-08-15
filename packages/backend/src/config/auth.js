"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuth = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_twitter_1 = require("passport-twitter");
const passport_apple_1 = require("passport-apple");
const client_1 = require("@prisma/client");
const passport_line_1 = require("passport-line");
const prisma = new client_1.PrismaClient();
const configureAuth = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({ where: { id } });
            done(null, user);
        }
        catch (error) {
            done(error, undefined);
        }
    }));
    // Google認証
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport.use(new passport_google_oauth20_1.Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                let user = yield prisma.user.findFirst({
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
                    user = yield prisma.user.create({
                        data: {
                            email: (_c = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '',
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
            }
            catch (error) {
                done(error, undefined);
            }
        })));
    }
    // Facebook認証
    if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
        passport.use(new passport_facebook_1.Strategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email']
        }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                let user = yield prisma.user.findFirst({
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
                    user = yield prisma.user.create({
                        data: {
                            email: (_c = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '',
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
            }
            catch (error) {
                done(error, undefined);
            }
        })));
    }
    // Twitter認証
    if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
        passport.use(new passport_twitter_1.Strategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            callbackURL: '/auth/twitter/callback'
        }, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                let user = yield prisma.user.findFirst({
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
                    user = yield prisma.user.create({
                        data: {
                            email: (_c = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '',
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
            }
            catch (error) {
                done(error, undefined);
            }
        })));
    }
    // LINE認証
    if (process.env.LINE_CLIENT_ID && process.env.LINE_CLIENT_SECRET) {
        passport.use(new passport_line_1.Strategy({
            channelID: process.env.LINE_CLIENT_ID,
            channelSecret: process.env.LINE_CLIENT_SECRET,
            callbackURL: '/auth/line/callback'
        }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                let user = yield prisma.user.findFirst({
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
                    user = yield prisma.user.create({
                        data: {
                            email: (_a = profile.email) !== null && _a !== void 0 ? _a : '',
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
            }
            catch (error) {
                done(error, undefined);
            }
        })));
    }
    // Apple認証
    if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
        passport.use(new passport_apple_1.Strategy({
            clientID: process.env.APPLE_CLIENT_ID,
            teamID: process.env.APPLE_TEAM_ID || '',
            keyID: process.env.APPLE_KEY_ID || '',
            privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION || '',
            callbackURL: '/auth/apple/callback',
            passReqToCallback: false
        }, (accessToken, refreshToken, idToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                let user = yield prisma.user.findFirst({
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
                    user = yield prisma.user.create({
                        data: {
                            email: (_a = profile.email) !== null && _a !== void 0 ? _a : '',
                            name: `${(_c = (_b = profile.name) === null || _b === void 0 ? void 0 : _b.firstName) !== null && _c !== void 0 ? _c : ''} ${(_e = (_d = profile.name) === null || _d === void 0 ? void 0 : _d.lastName) !== null && _e !== void 0 ? _e : ''}`.trim(),
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
            }
            catch (error) {
                done(error, undefined);
            }
        })));
    }
};
exports.configureAuth = configureAuth;
