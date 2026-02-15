import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function DetectionResult() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("DiseaseDetection")}>
            <Image
              source={require("../../assets/Images/arrow.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detection Result</Text>

          <TouchableOpacity>
            <Image
              source={require("../../assets/Images/share.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* RESULT IMAGE */}
        <Image
          source={require("../../assets/Images/leaf22.png")}
          style={styles.resultImage}
        />

        {/* RESULT BOX */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Result Detection:</Text>

          <Text style={styles.resultText}>
            Pest/Disease Detected: <Text style={styles.bold}>Early Blight</Text>
            {"\n"}(Fungal Disease){"\n"}
            Confidence: <Text style={styles.bold}>98%</Text>
          </Text>
        </View>

        {/* TREATMENT BOX */}
        <View style={styles.treatmentBox}>
          <Text style={styles.treatmentTitle}>Recommended Treatment</Text>

          <Text style={styles.treatList}>
            1. Remove infected leaves.{"\n"}
            2. Apply fungicide (e.g., Chlorothalonil).{"\n"}
            3. Improve air circulation.
          </Text>

          {/* BUY BUTTON */}
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
              Buy Recommended Fungicide – 15% OFF
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Disclaimer: Consult an agricultural expert for personalized advice.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081210",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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

  /* DETECTED IMAGE */
  resultImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },

  /* RESULT BOX */
  resultBox: {
    backgroundColor: "#7ADAA5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  resultText: {
    marginTop: 5,
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "700",
  },

  /* TREATMENT BOX */
  treatmentBox: {
    borderWidth: 1,
    borderColor: "#7ADAA5",
    borderRadius: 12,
    padding: 15,
  },
  treatmentTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  treatList: {
    color: "#fff",
    lineHeight: 20,
    marginBottom: 15,
  },

  /* BUY BUTTON */
  buyBtn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buyText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },

  disclaimer: {
    color: "#aaaaaa",
    fontSize: 12,
    lineHeight: 16,
  },
});
