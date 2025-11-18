import type { User } from '@/interfaces/auth';

export const shouldSetupSecurity = (user?: User | null) => {
  if (!user) return false;
  if (user.authProvider === 'google') return false;
  if (user.security?.enabled) return false;
  if (user.emailVerified === false) return false;
  return true;
};
