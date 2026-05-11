import { removeStoredEmail } from './userStorage';
import { setStoredRole } from './roleStorage';

/**
 * Logout the current user
 * - Clears the stored role
 * - Clears the stored email
 * - Should be called before navigating to Login/RoleSelect
 */
export async function logout() {
  try {
    await setStoredRole(null);
    await removeStoredEmail();
  } catch (error) {
    console.error('Logout error:', error);
    // ignore logout errors - best effort
  }
}
