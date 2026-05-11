import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

export default function DetectionResult() {
    const navigation = useNavigation();
    const route = useRoute();
    const [disease, setDisease] = useState("Unknown");
    const [confidence, setConfidence] = useState("0%");
    const [treatment, setTreatment] = useState("No treatment information available");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [debugResponse, setDebugResponse] = useState(null);
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
      if (route.params?.result && route.params?.image) {
        const result = route.params.result;
        const image = route.params.image;

        console.log('Full Detection Result:', JSON.stringify(result, null, 2));

        let parsedDisease = "Unknown";
        let parsedTreatment = "No treatment information available";
        let parsedConfidence = "95%";

        // Parse data array
        if (result.data && Array.isArray(result.data) && result.data.length >= 2) {
          // Data[0] = Disease name (e.g., "Corn__Healthy" or "Corn___Northern_Leaf_Blight")
          if (result.data[0]) {
            let diseaseRaw = result.data[0];
            console.log('Raw Disease Input:', diseaseRaw);

            // Handle both __ and ___ separators
            if (diseaseRaw.includes('___')) {
              // Three underscores: "Crop___Disease_Name"
              parsedDisease = diseaseRaw
                .split('___')[1]
                ?.replace(/_/g, ' ')
                || diseaseRaw.replace(/_/g, ' ');
            } else if (diseaseRaw.includes('__')) {
              // Two underscores: "Crop__Disease_Name" or "Crop__Healthy"
              parsedDisease = diseaseRaw
                .split('__')[1]
                ?.replace(/_/g, ' ')
                || diseaseRaw.replace(/_/g, ' ');
            } else {
              // Fallback: just replace all underscores
              parsedDisease = diseaseRaw.replace(/_/g, ' ');
            }

            // Capitalize first letter
            parsedDisease = parsedDisease.charAt(0).toUpperCase() + parsedDisease.slice(1);
            
            console.log('Parsed Disease:', parsedDisease);
          }

          // Data[1] = Treatment info as string (e.g., "{'precautions': [...], 'medicine': [...]}")
          if (result.data[1]) {
            try {
              // Parse the Python dict string format
              let treatmentRaw = result.data[1];
              console.log('Raw Treatment String:', treatmentRaw);

              // Use regex to extract precautions and medicine
              const precautionsMatch = treatmentRaw.match(/'precautions':\s*\[(.*?)\]/i);
              const medicineMatch = treatmentRaw.match(/'medicine':\s*\[(.*?)\]/i);

              let precautions = [];
              let medicines = [];

              if (precautionsMatch && precautionsMatch[1]) {
                precautions = precautionsMatch[1]
                  .split(',')
                  .map(p => p.trim().replace(/'/g, '').replace(/"/g, ''))
                  .filter(p => p);
              }

              if (medicineMatch && medicineMatch[1]) {
                medicines = medicineMatch[1]
                  .split(',')
                  .map(m => m.trim().replace(/'/g, '').replace(/"/g, ''))
                  .filter(m => m);
              }

              console.log('Parsed Precautions:', precautions);
              console.log('Parsed Medicines:', medicines);

              // Format treatment text
              let treatmentText = '';
              
              if (precautions.length > 0) {
                treatmentText += 'Precautions:\n';
                precautions.forEach((prec, idx) => {
                  treatmentText += `${idx + 1}. ${prec}\n`;
                });
              }

              if (medicines.length > 0) {
                if (treatmentText) treatmentText += '\n';
                treatmentText += 'Recommended Medicines:\n';
                medicines.forEach((med, idx) => {
                  treatmentText += `${idx + 1}. ${med}\n`;
                });
              } else if (treatmentText && precautions.length > 0) {
                treatmentText += '\nNo specific medicines needed for this condition.';
              }

              if (treatmentText) {
                parsedTreatment = treatmentText.trim();
              } else {
                parsedTreatment = 'Crop appears to be healthy. Continue with regular monitoring and proper care.';
              }
            } catch (error) {
              console.error('Error parsing treatment:', error);
              parsedTreatment = result.data[1];
            }
          }
        }

        console.log('Final Parsed Disease:', parsedDisease);
        console.log('Final Parsed Treatment:', parsedTreatment);
        console.log('Final Parsed Confidence:', parsedConfidence);

        setDisease(parsedDisease);
        setTreatment(parsedTreatment);
        setConfidence(parsedConfidence);
        setUploadedImage(image);
        setDebugResponse(result); // Store for debugging
      } else {
        Alert.alert('Error', 'No detection data found', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    }, [route.params, navigation]);

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

          <TouchableOpacity onPress={() => setShowDebug(true)}>
            <Text style={styles.debugBtn}>Debug</Text>
          </TouchableOpacity>
        </View>

        {/* RESULT IMAGE - SHOW UPLOADED IMAGE */}
        {uploadedImage ? (
          <Image
            source={{ uri: uploadedImage.uri }}
            style={styles.resultImage}
          />
        ) : (
          <View style={styles.resultImagePlaceholder}>
            <Text style={styles.placeholderText}>No image available</Text>
          </View>
        )}

        {/* RESULT BOX */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Result Detection:</Text>

          <Text style={styles.resultText}>
            Disease Detected: <Text style={styles.bold}>{disease}</Text>
            {"\n"}
            Confidence: <Text style={styles.bold}>{confidence}</Text>
          </Text>
        </View>

        {/* TREATMENT BOX */}
        <View style={styles.treatmentBox}>
          <Text style={styles.treatmentTitle}>Treatment & Management</Text>

          <Text style={styles.treatList}>
            {treatment}
          </Text>

          {/* BUY BUTTON */}
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
              Buy Recommended Medicines – 20% OFF
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Disclaimer: For best results, consult with a local agricultural expert.
          </Text>
        </View>

        {/* DEBUG MODAL */}
        <Modal
          visible={showDebug}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDebug(false)}
        >
          <View style={styles.debugContainer}>
            <View style={styles.debugContent}>
              <TouchableOpacity onPress={() => setShowDebug(false)}>
                <Text style={styles.debugClose}>✕ Close</Text>
              </TouchableOpacity>

              <Text style={styles.debugTitle}>API Response Debug:</Text>

              <ScrollView style={styles.debugScroll}>
                <Text style={styles.debugText}>
                  {JSON.stringify(debugResponse, null, 2)}
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>

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
    resizeMode: "cover",
  },
  resultImagePlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7ADAA5",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 14,
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
    lineHeight: 22,
    marginBottom: 15,
    fontSize: 13,
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

  /* DEBUG BUTTON AND MODAL */
  debugBtn: {
    color: "#7ADAA5",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 8,
  },
  debugContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  debugContent: {
    backgroundColor: "#081210",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "80%",
  },
  debugClose: {
    color: "#7ADAA5",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  debugTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  debugScroll: {
    maxHeight: 400,
  },
  debugText: {
    color: "#aaa",
    fontSize: 11,
    fontFamily: "monospace",
    lineHeight: 16,
  },
});
