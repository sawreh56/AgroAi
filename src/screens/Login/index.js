import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("login");

  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* LOGO */}
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/Images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CARD WITH BLUR BEHIND ONLY */}
            <View style={styles.cardWrapper}>
      
              {/* Blur only in this box (Android-safe) */}
              <View style={styles.blurContainer}>
                <BlurView
                  style={styles.absoluteBlur}
                  blurType="dark"
                  blurAmount={10}
                  reducedTransparencyFallbackColor="black"
                />
              </View>
      
              {/* CARD CONTENT (above blur) */}
              <View style={styles.cardContent}>
      

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "login" && styles.activeTab]}
              onPress={() => setActiveTab("login")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "login" && styles.activeTabText,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === "guest" && styles.activeTab]}
              onPress={() => setActiveTab("guest")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "guest" && styles.activeTabText,
                ]}
              >
                Guest
              </Text>
            </TouchableOpacity>
            
          </View>

          <Text style={styles.title}>Login to Account</Text>
          <Text style={styles.text1}>Enter registered phone number to</Text>
          <Text style={styles.text2}>login your account.</Text>

          {/* Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="+92 3XX-XXXXXXX"
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Otp")}
          >
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          <Text style={styles.footer}>
            Don’t have an account? <Text style={styles.link}>Create Account</Text>
          </Text>

        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  logoBox: {
    alignItems: "center",
    marginTop: 30,
  },

  logo: {
    width: 125,
    height: 125,
    marginLeft: 10,
  },

 cardWrapper: {
    width: 300,
    alignSelf: "center",
    marginTop: 20,
  },

  /** BLUR BOX WRAPPER */
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    overflow: "hidden",
    height: 420,
    width: 300,
    borderWidth: 1,
    borderColor: "#FFFFFF80",
  },

  absoluteBlur: {
    ...StyleSheet.absoluteFillObject,
  },

  /** CARD CONTENT ABOVE BLUR */
  cardContent: {
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  tabContainer: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    overflow: "hidden",
    width: 200,
    height: 45,
    alignSelf: "center",
    marginTop: 5,
  },

  tab: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  activeTab: {
    backgroundColor: "#7ADAA5",
  },

  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  activeTabText: {
    color: "white",
    fontWeight: "700",
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },

  text1: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },

  text2: {
    color: "white",
    textAlign: "center",
  },

  inputBox: {
    width: 210,
    height: 42,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 50,
    borderColor: "#FFFFFF99",
    borderWidth: 1,
    marginTop: 20,
    alignSelf: "center",
    paddingLeft: 15,
    justifyContent: "center",
  },

  input: {
    color: "black",
    fontSize: 14,
  },

  btn: {
    width: 210,
    height: 45,
    backgroundColor: "#7ADAA5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },

  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  orText: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
  },

  footer: {
    color: "white",
    fontSize: 13,
    marginTop: 20,
    textAlign: "center",
  },

  link: {
    color: "#66E3B6",
    fontWeight: "600",
  },
});
// 