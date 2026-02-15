import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DiseaseDetection = () => {
    const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
    

          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
          <TouchableOpacity style={styles.circleBtn}>
            <Image
              source={require("../../assets/Images/camera11.png")}
              style={styles.circleIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn}>
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
          <Text style={styles.noImageText}>
            {selectedImage ? "Image Selected" : "No image selected"}
          </Text>
        </View>

        {/* ---------- ANALYZE BUTTON ---------- */}
        <TouchableOpacity style={styles.analyzeBtn}  onPress={() => navigation.navigate("DetectionResult")}>
          <Text style={styles.analyzeText}>Analyze Image</Text>
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

  /* ANALYZE BUTTON */
  analyzeBtn: {
    backgroundColor: "#2ECC90",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
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
