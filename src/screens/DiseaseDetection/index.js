import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { api } from "../../api/client";

const DiseaseDetection = () => {
    const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'AgroAI needs camera access to take a plant photo.',
        buttonNegative: 'Cancel',
        buttonPositive: 'Allow',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Photo Library Permission',
      message: 'AgroAI needs gallery access to choose a plant photo.',
      buttonNegative: 'Cancel',
      buttonPositive: 'Allow',
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera permission is required to take a photo.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const openGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Gallery permission is required to choose a photo.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type || 'image/jpeg',
        name: selectedImage.fileName || 'image.jpg',
      });

      console.log('Uploading image:', selectedImage.fileName);
      const result = await api.upload('/api/predictions/crop/predict', formData);
      
      console.log('API Result:', JSON.stringify(result, null, 2));

      if (!result) {
        Alert.alert('Error', 'No response from server');
        setLoading(false);
        return;
      }

      navigation.navigate('DetectionResult', { result, image: selectedImage });
    } catch (error) {
      console.error('Analysis Error:', error);
      const errorMessage = error?.message || 'Unable to analyze the image. Please try again.';
      Alert.alert('Analysis Failed', errorMessage);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
    

          <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.backBtn} source={require("../../assets/Images/arrow.png")} />
            </TouchableOpacity>

          <Text style={styles.headerTitle}>Pest & Disease Detector</Text>

          <TouchableOpacity>
            <Image
              source={require("../../assets/Images/search11.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ---------- HEADING ---------- */}
        <Text style={styles.uploadTitle}>Upload Plant Image</Text>

        <Text style={styles.subText}>
          For accurate results, please capture a clear image of the affected
          plant part (leaf, stem, fruit, etc.) in good lighting.
        </Text>

        {/* ---------- BUTTONS ---------- */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.circleBtn} onPress={openCamera}>
            <Image
              source={require("../../assets/Images/camera11.png")}
              style={styles.circleIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn} onPress={openGallery}>
            <Image
              source={require("../../assets/Images/upload.png")}
              style={styles.circleIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowText}>
          <Text style={styles.btnText}>Take Photo</Text>
          <Text style={styles.btnText}>Upload Photo</Text>
        </View>

        {/* ---------- IMAGE PREVIEW BOX ---------- */}
        <View style={styles.imageBox}>
          {selectedImage ? (
            <Image 
              source={{ uri: selectedImage.uri }} 
              style={styles.previewImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No image selected</Text>
          )}
        </View>

        {/* ---------- ANALYZE BUTTON ---------- */}
        <TouchableOpacity style={[styles.analyzeBtn, loading && styles.disabledBtn]} onPress={analyzeImage} disabled={loading}>
          <Text style={styles.analyzeText}>{loading ? 'Analyzing...' : 'Analyze Image'}</Text>
        </TouchableOpacity>

        {/* ---------- RESULT SECTION ---------- */}
        <Text style={styles.resultTitle}>Result Detection:</Text>

        <Text style={styles.resultSubText}>
          Result will appear here after analysis.
        </Text>

      </ScrollView>
    </View>
  );
};

export default DiseaseDetection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1817",
    paddingHorizontal: 20,
    paddingTop: 45,
  },

  backBtn: {
    // position: "absolute",
    // margintop: 20,
    left: 10,
    height: 25,
    width: 25,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerIcon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* TITLE */
  uploadTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  subText: {
    color: "#cfcfcf",
    fontSize: 13,
    marginBottom: 25,
    lineHeight: 18,
  },

  /* CIRCLE BUTTONS */
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  circleBtn: {
    width: 80,
    height: 80,
    backgroundColor: "#2ECC90",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circleIcon: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },

  rowText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  /* IMAGE BOX */
  imageBox: {
    borderWidth: 1,
    borderColor: "#2ECC90",
    borderRadius: 12,
    height: 130,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#fff",
    opacity: 0.8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },

  /* ANALYZE BUTTON */
  analyzeBtn: {
    backgroundColor: "#2ECC90",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
  },
  disabledBtn: {
    backgroundColor: "#555",
  },
  analyzeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* RESULT SECTION */
  resultTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 25,
  },
  resultSubText: {
    color: "#cfcfcf",
    marginTop: 5,
  },
});
