import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Recommedation = () => {
    const navigation = useNavigation();
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
    >
      <ScrollView style={{ paddingHorizontal: 15 }}>

        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
          <View>
            <Text style={styles.title}>Nitrogen Content (N)</Text>
            <TextInput
              placeholder="Enter value (50–140)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={n}
              onChangeText={setN}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/phosphorus.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>Phosphorus Content (P)</Text>
            <TextInput
              placeholder="Enter value (30–60)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={p}
              onChangeText={setP}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/potassium.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>Potassium Content (K)</Text>
            <TextInput
              placeholder="Enter value (40–45)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={k}
              onChangeText={setK}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/temperature.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>Temperature (°C)</Text>
            <TextInput
              placeholder="Enter value (15–35)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={temp}
              onChangeText={setTemp}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/humidity.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>Humidity (%)</Text>
            <TextInput
              placeholder="Enter value (30–90)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={humidity}
              onChangeText={setHumidity}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/ph.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>PH Value</Text>
            <TextInput
              placeholder="Enter value (5.5–7.5)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={ph}
              onChangeText={setPh}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require("../../assets/Images/rainfall.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>Rainfall (mm)</Text>
            <TextInput
              placeholder="Enter value (50–300)"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="numeric"
              value={rainfall}
              onChangeText={setRainfall}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("CropRecommend")}>
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
