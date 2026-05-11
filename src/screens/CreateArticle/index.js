import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TouchableOpacity, TextInput, 
  ImageBackground, SafeAreaView, ScrollView, Switch, 
  Alert, PermissionsAndroid, Platform, Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function CreateArticle({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [imageUri, setImageUri] = useState(null); // Image store karne ke liye

  // --- Camera Permission Function ---
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App ko camera ki ijazat chahiye",
            buttonNeutral: "Baad mein",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // --- Camera Open Karne Ka Function ---
  const openCamera = async () => {
    const isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      const options = {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      };
      launchCamera(options, (response) => {
        if (response.assets) {
          setImageUri(response.assets[0].uri);
        }
      });
    } else {
      Alert.alert("Permission Error", "Camera permission nahi mili");
    }
  };

  // --- Gallery Se Image Uthane Ka Function ---
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.bgImage}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Article</Text>
          <TouchableOpacity style={styles.publishBtn}>
            <Text style={styles.publishBtnText}>Publish</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.label}>Article Title</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="input title" placeholderTextColor="#555" style={styles.input} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Article Content / Category</Text>
            <View style={styles.inputBox}>
              <TextInput 
                placeholder="Keep it clear...." 
                placeholderTextColor="#555" 
                style={[styles.input, { height: 60, textAlignVertical: 'top' }]} 
                multiline
              />
            </View>
          </View>

          {/* Cover Image Upload Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Cover Image</Text>
            <Text style={styles.optionalText}>(optional)</Text>

            {/* Agar image select ho jaye toh yahan dikhegi */}
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            )}

            <View style={styles.uploadRow}>
              <View style={styles.uploadItem}>
                <TouchableOpacity style={styles.circleBtn} onPress={openCamera}>
                  <Icon name="camera" size={35} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.uploadLabel}>Take Photo</Text>
              </View>
              <View style={styles.uploadItem}>
                <TouchableOpacity style={styles.circleBtn} onPress={openGallery}>
                  <Icon name="cloud-upload" size={35} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.uploadLabel}>Upload Photo</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Related Resources</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>#Links</Text></View>
            </View>
            <View style={styles.tagInput}>
              <Text style={styles.tagPlaceholder}>Select relevant tags, #pest......</Text>
              <Switch 
                value={isEnabled} 
                onValueChange={setIsEnabled} 
                trackColor={{ false: "#767577", true: "#fff" }}
                thumbColor={isEnabled ? "#76D7A4" : "#f4f3f4"}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bgImage: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  publishBtn: { backgroundColor: '#76D7A4', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 10 },
  publishBtnText: { color: '#fff', fontWeight: 'bold' },
  scroll: { padding: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  optionalText: { color: '#999', fontSize: 14, marginBottom: 10 },
  inputBox: { backgroundColor: '#A3B1AA', borderRadius: 10, marginTop: 10, paddingHorizontal: 10 },
  input: { height: 45, color: '#000' },
  uploadRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  uploadItem: { alignItems: 'center' },
  circleBtn: { 
    width: 70, height: 70, borderRadius: 35, 
    backgroundColor: '#76D7A4', justifyContent: 'center', alignItems: 'center' 
  },
  uploadLabel: { fontSize: 11, color: '#000', marginTop: 5 },
  previewImage: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10, resizeMode: 'cover' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#76D7A4', paddingHorizontal: 10, borderRadius: 10 },
  badgeText: { color: '#fff', fontSize: 12 },
  tagInput: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    backgroundColor: '#A3B1AA', borderRadius: 10, marginTop: 15, paddingHorizontal: 10, height: 45 
  },
  tagPlaceholder: { color: '#333', fontSize: 13 }
});