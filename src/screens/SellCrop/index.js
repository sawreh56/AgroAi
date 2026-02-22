import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const SellCrop = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")} // 🌿 your leaf background image
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Sell My Crops</Text>

          <TouchableOpacity style={styles.listingBtn}>
            <Text style={styles.listingText}>Listings</Text>
          </TouchableOpacity>
        </View>

        {/* Crop Information */}
        <View style={styles.card}>
          <Text style={styles.title}>Crop Information</Text>
          <TextInput
            placeholder="input title"
            placeholderTextColor="#000"
            style={styles.input}
          />
        </View>

        {/* Variety Grade */}
        <View style={styles.card}>
          <Text style={styles.title}>Variety/ Grade</Text>
          <TextInput
            placeholder="Keep it clear...."
            placeholderTextColor="#000"
            style={styles.input}
          />
        </View>

        {/* Crop Photos */}
        <View style={styles.card}>
          <Text style={styles.title}>Crop Photos</Text>
          <Text style={styles.subText}>(Recommended)</Text>

          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.circleBtn}>
              <Icon name="camera-outline" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Icon name="cloud-upload-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.photoLabelRow}>
            <Text style={styles.photoLabel}>Take Photo</Text>
            <Text style={styles.photoLabel}>Upload Photo</Text>
          </View>
        </View>

        {/* Contact Number */}
        <View style={styles.card}>
          <View style={styles.contactHeader}>
            <Text style={styles.title}>Contact Number</Text>

            <TouchableOpacity style={styles.locationBtn}>
              <Text style={styles.locationText}>Location</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="+92 3XX XXXX77"
            placeholderTextColor="#000"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postBtn}>
          <Text style={styles.postText}>Post Listings</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default SellCrop;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  listingBtn: {
    backgroundColor: "#7ED6A3",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  listingText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#F2F2F2",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#000",
  },

  subText: {
    color: "#888",
    marginTop: -10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "400",

  },

  input: {
    backgroundColor: "#95A59B",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "#000",
    fontWeight: "100",

  },

  photoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },

  circleBtn: {
    backgroundColor: "#7ED6A3",
    height: 70,
    width: 70,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  photoLabelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  photoLabel: {
    fontSize: 14,
    color: "#000",
    marginLeft:35
  },

  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  locationBtn: {
    backgroundColor: "#7ED6A3",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  locationText: {
    color: "#fff",
    fontWeight: "600",
  },

  postBtn: {
    backgroundColor: "#7ED6A3",
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 10,
  },

  postText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // pura background cover kare
    backgroundColor: "rgba(0,0,0,0.5)", // 50% dark overlay
  },
});