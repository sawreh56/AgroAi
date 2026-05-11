import { useRef, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

/**
 * Custom hook for handling image selection from camera or gallery
 * @returns {Object} { selectedImage, isLoading, pickImage }
 */
export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isPickerAlertOpenRef = useRef(false);

  const imagePickerOptions = {
    mediaType: 'photo',
    maxWidth: 1000,
    maxHeight: 1000,
    quality: 0.8,
    includeBase64: true,
    cameraType: 'front',
  };

  const openPermissionSettings = (permissionName) => {
    Alert.alert(
      'Permission Required',
      `${permissionName} permission is blocked. Please enable it from app settings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ],
    );
  };

  const requestAndroidPermission = async (permission, title, message, permissionName) => {
    const alreadyGranted = await PermissionsAndroid.check(permission);
    if (alreadyGranted) return true;

    const result = await PermissionsAndroid.request(permission, {
      title,
      message,
      buttonNegative: 'Cancel',
      buttonPositive: 'Allow',
    });

    if (result === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      openPermissionSettings(permissionName);
      return false;
    }

    Alert.alert('Permission Required', `${permissionName} permission is required to continue.`);
    return false;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    return requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      'Camera Permission',
      'AgroAI needs camera access to take a profile photo.',
      'Camera',
    );
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    return requestAndroidPermission(
      permission,
      'Photo Library Permission',
      'AgroAI needs gallery access to choose a profile photo.',
      'Gallery',
    );
  };

  /**
   * Launch camera to take a new photo
   */
  const pickFromCamera = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        return;
      }

      const response = await launchCamera(imagePickerOptions);

      if (response.didCancel) {
        console.log('Camera cancelled');
        setIsLoading(false);
        return;
      }

      if (response.errorCode) {
        const errorMessages = {
          'permission': 'Camera permission denied. Please enable it in settings.',
          'unavailable': 'Camera is not available on this device.',
        };
        Alert.alert('Error', errorMessages[response.errorCode] || response.errorMessage);
        setIsLoading(false);
        return;
      }

      if (response.assets && response.assets[0]) {
        const image = response.assets[0];
        setSelectedImage({
          uri: image.uri,
          type: image.type,
          fileName: image.fileName,
          base64: image.base64,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Launch gallery to pick an existing photo
   */
  const pickFromGallery = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        return;
      }

      const response = await launchImageLibrary(imagePickerOptions);

      if (response.didCancel) {
        console.log('Gallery cancelled');
        setIsLoading(false);
        return;
      }

      if (response.errorCode) {
        const errorMessages = {
          'permission': 'Photo library permission denied. Please enable it in settings.',
          'unavailable': 'Photo library is not available on this device.',
        };
        Alert.alert('Error', errorMessages[response.errorCode] || response.errorMessage);
        setIsLoading(false);
        return;
      }

      if (response.assets && response.assets[0]) {
        const image = response.assets[0];
        setSelectedImage({
          uri: image.uri,
          type: image.type,
          fileName: image.fileName,
          base64: image.base64,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      console.error('Gallery error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Show action sheet for selecting image source
   */
  const showImagePickerOptions = () => {
    if (isPickerAlertOpenRef.current || isLoading) return;

    isPickerAlertOpenRef.current = true;
    const closeAlert = () => {
      isPickerAlertOpenRef.current = false;
    };

    Alert.alert(
      'Select Photo Source',
      'Choose where you want to pick your image from',
      [
        {
          text: 'Camera',
          onPress: () => {
            closeAlert();
            setTimeout(pickFromCamera, 300);
          },
          style: 'default',
        },
        {
          text: 'Gallery',
          onPress: () => {
            closeAlert();
            setTimeout(pickFromGallery, 300);
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => {
            closeAlert();
            console.log('Cancelled');
          },
          style: 'cancel',
        },
      ],
      { cancelable: false, onDismiss: closeAlert }
    );
  };

  return {
    selectedImage,
    isLoading,
    pickFromCamera,
    pickFromGallery,
    showImagePickerOptions,
  };
};
