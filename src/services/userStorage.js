import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@agroai_user_email';
const STORAGE_USER_NAME = '@agroai_user_name';
const STORAGE_USER_IMAGE = '@agroai_user_image';

export async function getStoredEmail() {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export async function setStoredEmail(email) {
  try {
    if (email == null) {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, String(email));
    }
  } catch {
    // ignore storage errors
  }
}

export async function removeStoredEmail() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

export async function getStoredUserName() {
  try {
    return await AsyncStorage.getItem(STORAGE_USER_NAME);
  } catch {
    return null;
  }
}

export async function setStoredUserName(name) {
  try {
    if (name == null) {
      await AsyncStorage.removeItem(STORAGE_USER_NAME);
    } else {
      await AsyncStorage.setItem(STORAGE_USER_NAME, String(name));
    }
  } catch {
    // ignore storage errors
  }
}

export async function getStoredUserImage() {
  try {
    return await AsyncStorage.getItem(STORAGE_USER_IMAGE);
  } catch {
    return null;
  }
}

export async function setStoredUserImage(imageUrl) {
  try {
    if (imageUrl == null) {
      await AsyncStorage.removeItem(STORAGE_USER_IMAGE);
    } else {
      await AsyncStorage.setItem(STORAGE_USER_IMAGE, String(imageUrl));
    }
  } catch {
    // ignore storage errors
  }
}

export async function clearAllUserData() {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEY, STORAGE_USER_NAME, STORAGE_USER_IMAGE]);
  } catch {
    // ignore storage errors
  }
}
