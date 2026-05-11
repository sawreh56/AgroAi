import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image, ScrollView, Alert, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const SellCrop = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (res) => {
      if (res.assets) setSelectedImage(res.assets[0]);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (res) => {
      if (res.assets) setSelectedImage(res.assets[0]);
    });
  };

  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch(() => Alert.alert("Error", "Maps nahi khul raha"));
  };

  const handlePost = () => {
    if (!selectedImage || !cropName || !phoneNumber) {
      Alert.alert("Missing Information", "Please provide photo, name, and phone number.");
      return;
    }
    navigation.navigate("CropListing", { 
      imageUri: selectedImage.uri,
      name: cropName,
      variety: variety || "A Grade Premium",
      phone: phoneNumber,
      sellerName: "Alishba" 
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/Images/bg2.png")} style={styles.bg}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sell My Crops</Text>
            <TouchableOpacity style={styles.listingsBtn}>
              <Text style={styles.listText}>Listings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>Crop Information</Text>
            <TextInput style={styles.inputField} placeholder="Input title" placeholderTextColor="#555" value={cropName} onChangeText={setCropName} />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>Variety/ Grade</Text>
            <TextInput style={styles.inputField} placeholder="Keep it clean..." placeholderTextColor="#555" value={variety} onChangeText={setVariety} />
          </View>

          {/* CROP PHOTOS SECTION - Preview aur Icons dono saath */}
          <View style={styles.inputCard}>
            <Text style={styles.label}>Crop Photos</Text>
            <Text style={styles.subLabel}>(Recommended)</Text>
            
            <View style={styles.photoContainer}>
              {/* Agar image select ho toh ye box icons ke upar nazar aaye ga */}
              {selectedImage && (
                <View style={styles.imageBoxAbove}>
                  <Image source={{ uri: selectedImage.uri }} style={styles.smallPreview} />
                  <TouchableOpacity style={styles.miniDelete} onPress={() => setSelectedImage(null)}>
                    <Icon name="close-circle" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}

              {/* Icons hamesha nazar aayenge (As per your request) */}
              <View style={styles.photoActions}>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.circleIcon} onPress={openCamera}>
                    <Icon name="camera" size={30} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.actionText}>Take Photo</Text>
                </View>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.circleIcon} onPress={openGallery}>
                    <Icon name="cloud-upload" size={30} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.actionText}>Upload Photo</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.label}>Contact Number</Text>
                <TouchableOpacity onPress={openMaps} style={styles.locationTag}><Text style={styles.locText}>Location</Text></TouchableOpacity>
            </View>
            <TextInput 
              style={styles.inputField} 
              placeholder="+92 3xx xxxxxxx" 
              placeholderTextColor="#555"
              value={phoneNumber} 
              onChangeText={setPhoneNumber} 
              keyboardType="phone-pad" 
            />
          </View>

          <TouchableOpacity style={styles.mainPostBtn} onPress={handlePost}>
            <Text style={styles.mainPostText}>Post Listings</Text>
          </TouchableOpacity>

        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bg: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listingsBtn: { backgroundColor: '#7ADAA5', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 8 },
  listText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  inputCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  subLabel: { fontSize: 12, color: '#888', marginBottom: 10 },
  inputField: { backgroundColor: '#A3B1AA', borderRadius: 10, padding: 12, color: '#000', marginTop: 5 },
  
  photoContainer: { marginTop: 5, alignItems: 'center' },
  imageBoxAbove: { width: '100%', height: 120, borderRadius: 10, backgroundColor: '#f0f0f0', marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd' },
  smallPreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  miniDelete: { position: 'absolute', top: 5, right: 5, backgroundColor: '#fff', borderRadius: 10 },

  photoActions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  actionItem: { alignItems: 'center' },
  circleIcon: { backgroundColor: '#7ADAA5', width: 65, height: 65, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  actionText: { fontSize: 10, color: '#000', marginTop: 5 },
  
  locationTag: { backgroundColor: '#7ADAA5', paddingHorizontal: 12, borderRadius: 12, height: 25, justifyContent: 'center' },
  locText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  mainPostBtn: { backgroundColor: '#7ADAA5', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  mainPostText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});

export default SellCrop;