import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const CropRecommend = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [recommendation, setRecommendation] = useState("");
  const [topCrops, setTopCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params?.recommendation && route.params?.topCrops) {
      setRecommendation(route.params.recommendation);
      setTopCrops(route.params.topCrops);
      setLoading(false);
    } else {
      Alert.alert("Error", "No recommendation data found", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }
  }, [route.params]);

  // Crop image mapping - simplified to only mango for now
  const getCropImage = (cropName) => {
    // Default to mango image for all crops - you can add more images later
    return require("../../assets/Images/mango.png");
  };

  // Crop details mapping - simplified
  const getCropDetails = (cropName) => {
    const cropDetails = {
      'mango': {
        description: "Mango is a delicious tropical fruit, best grown in warm climates with well-drained soil.",
        water: "Moderate to High",
        soil: "Loamy, pH 6.0–7.0",
        climate: "Warm, high humidity"
      },
      'rice': {
        description: "Rice is a staple food crop that requires abundant water and warm temperatures.",
        water: "Very High",
        soil: "Clay, pH 5.5–7.0",
        climate: "Hot and humid"
      },
      'wheat': {
        description: "Wheat is a major cereal crop that grows best in cooler climates.",
        water: "Moderate",
        soil: "Loamy, pH 6.0–7.5",
        climate: "Cool, dry"
      }
    };
    
    return cropDetails[cropName?.toLowerCase()] || {
      description: `${cropName} is a recommended crop based on your environmental conditions.`,
      water: "Moderate",
      soil: "Well-drained",
      climate: "Moderate"
    };
  };

  if (loading) {
    return (
      <ImageBackground source={require("../../assets/Images/bg2.png")} style={styles.bg}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recommendation...</Text>
        </View>
      </ImageBackground>
    );
  }

  const mainCrop = topCrops[0] || "Unknown";
  const cropDetails = getCropDetails(mainCrop);

  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/Images/arrow.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Crop Recommendation</Text>

          <TouchableOpacity>
            <Image
              source={require("../../assets/Images/share.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Your Recommended Crop Is:</Text>
          <Text style={styles.cropName}>{mainCrop.charAt(0).toUpperCase() + mainCrop.slice(1)}</Text>

          {/* Crop Image - Using mango image for all crops for now */}
          <Image
            source={getCropImage(mainCrop)}
            style={styles.cropImage}
          />

          {/* Details Box */}
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              {cropDetails.description}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.bold}>Water Needs:</Text> {cropDetails.water}{"\n"}
              <Text style={styles.bold}>Optimal Soil:</Text> {cropDetails.soil}{"\n"}
              <Text style={styles.bold}>Optimal Climate:</Text> {cropDetails.climate}
            </Text>
          </View>

          {/* Top 5 Crops Section */}
          {topCrops.length > 1 && (
            <View style={styles.topCropsBox}>
              <Text style={styles.topCropsTitle}>Top 5 Suitable Crops:</Text>
              {topCrops.map((crop, index) => (
                <Text key={index} style={styles.topCropItem}>
                  {index + 1}. {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Recommedation")}
        >
          <Text style={styles.btnText}>Get Another Recommendation</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  header: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerIcon: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 15,
    paddingBottom: 20,
    borderWidth: 2,
    borderColor: "#7ADAA5",
  },

  label: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  cropName: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },

  cropImage: {
    width: "90%",
    height: 180,
    borderRadius: 10,
    alignSelf: "center",
  },

  detailBox: {
    backgroundColor: "#7ADAA5",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },

  detailText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    lineHeight: 20,
  },

  bold: {
    fontWeight: "bold",
  },

  topCropsBox: {
    backgroundColor: "#F0F8F5",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#7ADAA5",
  },

  topCropsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  topCropItem: {
    fontSize: 14,
    marginVertical: 2,
  },

  btn: {
    backgroundColor: "#7ADAA5",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 15,
    borderRadius: 30,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CropRecommend;