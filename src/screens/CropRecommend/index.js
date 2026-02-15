import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CropRecommend = () => {
  const navigation = useNavigation();

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
          <Text style={styles.cropName}>Mango</Text>

          {/* Crop Image */}
          <Image
            source={require("../../assets/Images/mango.png")}
            style={styles.cropImage}
          />

          {/* Details Box */}
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              Mango is a delicious tropical fruit, best grown in warm climates
              with well-drained soil.
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.bold}>Water Needs:</Text> Moderate to High{"\n"}
              <Text style={styles.bold}>Optimal Soil:</Text> Loamy, pH 6.0–7.0{"\n"}
              <Text style={styles.bold}>Optimal Climate:</Text> Warm, high humidity
            </Text>
          </View>
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
