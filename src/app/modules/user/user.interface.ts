export type TRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}
