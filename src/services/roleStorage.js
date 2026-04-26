import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_ROLES } from '../constants/roles';

const STORAGE_KEY = '@agroai/userRole';

export async function getStoredRole() {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return ALL_ROLES.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export async function setStoredRole(role) {
  try {
    if (!role) {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEY, role);
  } catch {
    // ignore; role persistence is best-effort
  }
}

