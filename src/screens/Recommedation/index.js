import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/client";

const Recommedation = () => {
  const navigation = useNavigation();
  const [n, setN] = useState("116");
  const [p, setP] = useState("45");
  const [k, setK] = useState("42");
  const [temp, setTemp] = useState("25");
  const [humidity, setHumidity] = useState("60");
  const [ph, setPh] = useState("6.5");
  const [rainfall, setRainfall] = useState("150");

  // Error states for validation
  const [errors, setErrors] = useState({
    n: "",
    p: "",
    k: "",
    temp: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  // Validation ranges
  const ranges = {
    n: { min: 50, max: 140, label: "Nitrogen" },
    p: { min: 30, max: 60, label: "Phosphorus" },
    k: { min: 40, max: 45, label: "Potassium" },
    temp: { min: 15, max: 35, label: "Temperature" },
    humidity: { min: 30, max: 90, label: "Humidity" },
    ph: { min: 5.5, max: 7.5, label: "pH" },
    rainfall: { min: 50, max: 300, label: "Rainfall" }
  };

  // Validate individual field
  const validateField = (field, value) => {
    if (!value) {
      setErrors(prev => ({ ...prev, [field]: "" }));
      return;
    }

    const numValue = parseFloat(value);
    const range = ranges[field];

    if (isNaN(numValue)) {
      setErrors(prev => ({ ...prev, [field]: "Enter a valid number" }));
    } else if (numValue < range.min || numValue > range.max) {
      setErrors(prev => ({ 
        ...prev, 
        [field]: `${range.label} must be between ${range.min} and ${range.max}` 
      }));
    } else {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Helper function to extract crop name from HTML
  const extractCropFromHTML = (htmlString) => {
    // Look for <p>crop_name</p> pattern
    const match = htmlString.match(/<p>([^<]+)<\/p>/);
    if (match && match[1]) {
      return match[1].toLowerCase().trim();
    }
    return null;
  };

  const predictCrop = async () => {
    // Validation
    if (!n || !p || !k || !temp || !humidity || !ph || !rainfall) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== "");
    if (hasErrors) {
      Alert.alert("Validation Error", "Please fix the errors in the form before proceeding");
      return;
    }

    try {
      const response = await api.post('/api/predictions/crop/recommendation', {
        nitrogen: parseFloat(n),
        phosphorus: parseFloat(p),
        potassium: parseFloat(k),
        temperature: parseFloat(temp),
        humidity: parseFloat(humidity),
        ph: parseFloat(ph),
        rainfall: parseFloat(rainfall),
      });

      console.log('API Response:', JSON.stringify(response, null, 2));

      // Parse the API response - handle HTML data format
      let recommendation = "Unknown";
      let topCrops = [];

      if (response.data && Array.isArray(response.data)) {
        // Extract crop name from first HTML element
        if (response.data[0]) {
          const cropName = extractCropFromHTML(response.data[0]);
          if (cropName) {
            recommendation = cropName;
            topCrops = [cropName];
          }
        }
      } else if (response.recommended_crop) {
        recommendation = response.recommended_crop;
        topCrops = [recommendation];
      } else if (response.recommendation) {
        recommendation = response.recommendation;
        topCrops = [recommendation];
      }

      if (recommendation === "Unknown") {
        Alert.alert("Error", "Could not extract recommendation from API response");
        return;
      }

      navigation.navigate("CropRecommend", {
        recommendation,
        topCrops,
      });
    } catch (error) {
      console.error('Prediction Error:', error);
      Alert.alert("Error", error.message || "Failed to get recommendation. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
    >
      <ScrollView style={{ paddingHorizontal: 15 }}>

        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require("../../assets/Images/arrow.png")}
                style={styles.headerIcon}
                />
        </TouchableOpacity>
        
        <Text style={styles.header}>Crop Recommendation</Text>
        </View>

        {/* 📌 REUSABLE INPUT BOX */}
        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/nitrogen.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Nitrogen Content (N)</Text>
            <TextInput
              placeholder="Nitrogen in soil (50–140)"
              placeholderTextColor="#555"
              style={[styles.input, errors.n ? styles.inputError : null]}
              keyboardType="numeric"
              value={n}
              onChangeText={(text) => {
                setN(text);
                validateField('n', text);
              }}
            />
            {errors.n ? <Text style={styles.errorMessage}>{errors.n}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/phosphorus.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Phosphorus Content (P)</Text>
            <TextInput
              placeholder="Phosphorus in soil (30–60)"
              placeholderTextColor="#555"
              style={[styles.input, errors.p ? styles.inputError : null]}
              keyboardType="numeric"
              value={p}
              onChangeText={(text) => {
                setP(text);
                validateField('p', text);
              }}
            />
            {errors.p ? <Text style={styles.errorMessage}>{errors.p}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/potassium.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Potassium Content (K)</Text>
            <TextInput
              placeholder="Potassium in soil (40–45)"
              placeholderTextColor="#555"
              style={[styles.input, errors.k ? styles.inputError : null]}
              keyboardType="numeric"
              value={k}
              onChangeText={(text) => {
                setK(text);
                validateField('k', text);
              }}
            />
            {errors.k ? <Text style={styles.errorMessage}>{errors.k}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/temperature.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Average Temperature (°C)</Text>
            <TextInput
              placeholder="Temperature (15–35°C)"
              placeholderTextColor="#555"
              style={[styles.input, errors.temp ? styles.inputError : null]}
              keyboardType="numeric"
              value={temp}
              onChangeText={(text) => {
                setTemp(text);
                validateField('temp', text);
              }}
            />
            {errors.temp ? <Text style={styles.errorMessage}>{errors.temp}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/humidity.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Relative Humidity (%)</Text>
            <TextInput
              placeholder="Humidity (30–90%)"
              placeholderTextColor="#555"
              style={[styles.input, errors.humidity ? styles.inputError : null]}
              keyboardType="numeric"
              value={humidity}
              onChangeText={(text) => {
                setHumidity(text);
                validateField('humidity', text);
              }}
            />
            {errors.humidity ? <Text style={styles.errorMessage}>{errors.humidity}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/ph.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Soil pH Level</Text>
            <TextInput
              placeholder="pH level (5.5–7.5)"
              placeholderTextColor="#555"
              style={[styles.input, errors.ph ? styles.inputError : null]}
              keyboardType="numeric"
              value={ph}
              onChangeText={(text) => {
                setPh(text);
                validateField('ph', text);
              }}
            />
            {errors.ph ? <Text style={styles.errorMessage}>{errors.ph}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/rainfall.png")}
            style={styles.icon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Average Rainfall (mm)</Text>
            <TextInput
              placeholder="Rainfall (50–300mm)"
              placeholderTextColor="#555"
              style={[styles.input, errors.rainfall ? styles.inputError : null]}
              keyboardType="numeric"
              value={rainfall}
              onChangeText={(text) => {
                setRainfall(text);
                validateField('rainfall', text);
              }}
            />
            {errors.rainfall ? <Text style={styles.errorMessage}>{errors.rainfall}</Text> : null}
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={predictCrop}>
          <Text style={styles.btnText}>Get Recommendation</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default Recommedation;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    marginLeft:30
  },
  box: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    elevation: 5,
  },

  headerIcon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
    marginTop:4
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 3,
    width: 200,
  },
  inputError: {
    borderBottomColor: "#ff4444",
    borderBottomWidth: 2,
  },
  errorMessage: {
    color: "#ff4444",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  btn: {
    backgroundColor: "#5ED18F",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});