import { Request } from 'express';

export type AuthProvider = 'google' | 'facebook' | 'twitter' | 'line' | 'apple';

export interface User {
  id: string;
  email: string;
  name: string;
  provider: AuthProvider;
  providerId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}