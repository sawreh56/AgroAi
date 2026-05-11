import {StyleSheet,Text,View,Image,TouchableOpacity,ImageBackground,TextInput,Alert, ActivityIndicator,} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SafeBlurView from "../../Components/SafeBlurView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "../../api/client";

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const role = route.params?.role || null;
  const registeredEmail = route.params?.email || "";
  const [activeTab, setActiveTab] = useState("login");
  const [identifier, setIdentifier] = useState(registeredEmail); // email
  const [identifierError, setIdentifierError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const sendOtpLockedRef = useRef(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  useEffect(() => {
    if (registeredEmail) {
      setIdentifier(registeredEmail);
    }
  }, [registeredEmail]);

  const handleSendOtp = async () => {
    if (sendOtpLockedRef.current) return;
    sendOtpLockedRef.current = true;

    // clear previous
    setIdentifierError("");

    if (!identifier.trim()) {
      setIdentifierError("This field is required.");
      sendOtpLockedRef.current = false;
      return;
    }

    if (!isValidEmail(identifier)) {
      setIdentifierError("Enter a valid email address.");
      sendOtpLockedRef.current = false;
      return;
    }

    setIsSendingOtp(true);
    try {
      const normalizedEmail = identifier.trim().toLowerCase();
      
      // 🔧 BYPASS MODE - Skip API call and go directly to OTP screen
      if (devMode) {
        navigation.navigate("Otp", { 
          email: normalizedEmail, 
          role: role || "farmer",
          isNewRegistration: !!role,
          bypassMode: true
        });
      } else {
        const response = await api.post(
          '/api/auth/login',
          { email: normalizedEmail },
          { timeoutMs: 25000 },
        );
        // Capture the role from the login API response
        const roleFromResponse = response?.user_type || response?.role || response?.data?.user_type || response?.data?.role || role;
        navigation.navigate("Otp", { 
          email: normalizedEmail, 
          role: roleFromResponse,
          isNewRegistration: !!role // If role was passed from registration, it's a new user
        });
      }
    } catch (error) {
      const message = error?.message === 'Request timed out. Please try again.'
        ? 'OTP server is taking too long to respond. Please try again in a few seconds.'
        : error?.message || 'Unable to send OTP. Please try again.';
      Alert.alert('Login Failed', message);
    } finally {
      sendOtpLockedRef.current = false;
      setIsSendingOtp(false);
    }
  };

  return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
    
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
                <SafeBlurView
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
              onPress={() => {
                setActiveTab("guest");
                navigation.navigate("Guest"); // Guest screen par bhejne ke liye
              }}
            >
              <Text style={[styles.tabText, activeTab === "guest" && styles.activeTabText]}>
                Guest
              </Text>
            </TouchableOpacity>
            
          </View>

          <Text style={styles.title}>Login to Account</Text>
          <Text style={styles.text1}>Enter registered email to</Text>
          <Text style={styles.text2}>login to your account.</Text>

          {/* Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              style={styles.input}
              value={identifier}
              onChangeText={(t) => {
                setIdentifier(t);
                if (identifierError) setIdentifierError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* FIXED HEIGHT ERROR BOX */}
            <View style={{ height: 10, justifyContent: "center" }}>
              <Text style={styles.errorText}>
                {identifierError || " "}
              </Text>
            </View>
          </View>

          {/* 🔧 DEV MODE TOGGLE */}
          <TouchableOpacity 
            onPress={() => setDevMode(!devMode)}
            style={{ marginVertical: 10, paddingHorizontal: 10, backgroundColor: devMode ? 'rgba(122, 218, 165, 0.3)' : 'rgba(255,255,255,0.1)', paddingVertical: 8, borderRadius: 6 }}
          >
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>
              {devMode ? '✓ Dev Mode ON (OTP Bypass Enabled)' : 'Dev Mode OFF'}
            </Text>
          </TouchableOpacity>

          {/* Button */}
          <TouchableOpacity
            style={[styles.btn, isSendingOtp && styles.disabledBtn]}
            onPress={handleSendOtp}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          <Text style={styles.footer}>
            Don’t have an account? <Text style={styles.link}>Create Account</Text>
          </Text>

        </View>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  logoBox: {
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    width: 145,
    height: 145,
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
    fontWeight:400,
    marginTop: 10,
    textAlign: "center",
  },

  text2: {
    fontWeight:400,
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
    marginTop: 22,
    alignSelf: "center",
    paddingLeft: 15,
    justifyContent: "center",
  
  },

  input: {
    color: "black",
    fontSize: 14,
    fontWeight:"400",
    height: 45,
    marginTop:6
  },

  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: -10,
    textAlign: "center",
  },

  btn: {
    width: 210,
    height: 45,
    backgroundColor: "#7ADAA5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    alignSelf: "center",

  },

  disabledBtn: {
    opacity: 0.7,
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
    color: "#66E3B6",
    fontWeight:400,
    fontSize: 13,
    marginTop: 20,
    textAlign: "center",
  },

  link: {
    color:'white',
    fontWeight: "400",
  },
});
// 
