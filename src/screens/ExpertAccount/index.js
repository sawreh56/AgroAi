import {ImageBackground,StyleSheet,Text,View,Image,TouchableOpacity,TextInput, ScrollView, Alert, Platform} from "react-native";
import React, { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const ExpertAccount = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [expertiseError, setExpertiseError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [bioError, setBioError] = useState("");

  const baseUrl = Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000";

  const handleRegister = () => {
    // clear previous
    setFullNameError("");
    setPhoneError("");
    setEmailError("");
    setExpertiseError("");
    setExperienceError("");
    setBioError("");

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneDigits = phone.replace(/\D/g, "");

    let hasError = false;

    if (!isChecked) {
      Alert.alert("Terms Required", "Please agree to the Terms & Privacy to continue.");
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setFullNameError("Full name is required (min 2 characters).");
      hasError = true;
    }

    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setPhoneError("Please enter a valid phone number (7-15 digits).");
      hasError = true;
    }

    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!expertise.trim()) {
      setExpertiseError("Area of expertise is required.");
      hasError = true;
    }

    if (!experience.trim()) {
      setExperienceError("Years of experience is required.");
      hasError = true;
    } else if (isNaN(Number(experience))) {
      setExperienceError("Years of experience must be a number.");
      hasError = true;
    }

    if (!bio.trim()) {
      setBioError("Short bio is required.");
      hasError = true;
    }

    if (hasError) return;

    navigation.navigate("CongratulationExprt");
  };

  return (
    <ScrollView>
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")}>
        <Image style={styles.backBtn} source={require("../../assets/Images/arrow.png")} />
      </TouchableOpacity>

      {/* LOGO */}
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/Images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.account}>Create Expert Account</Text>

      {/* CARD */}
      <View style={styles.cardWrapper}>

        
        {/* BLUR BOX */}
        <View style={styles.blurContainer}>
          <BlurView
            style={styles.blurFill}
            blurType="dark"
            blurAmount={8}
            reducedTransparencyFallbackColor="black"
          />

          {/* INPUTS */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#000"
              style={styles.input}
              value={fullName}
              onChangeText={(t) => {
                setFullName(t);
                if (fullNameError) setFullNameError("");
              }}
            />
          </View>
          {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}

          <View style={styles.inputBox}>
            <TextInput
              placeholder="+92 3XX-XXXXXXX"
              placeholderTextColor="#000"
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                if (phoneError) setPhoneError("");
              }}
            />
          </View>
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email (Required)"
              placeholderTextColor="#000"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError("");
              }}
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


          <View style={styles. inputBox}>
            <TextInput 
              placeholder="Area of Expertise"
              placeholderTextColor= "#000"
              style={styles.input}
              value={expertise}
              onChangeText={(t) => {
                setExpertise(t);
                if (expertiseError) setExpertiseError("");
              }}
            />
          </View>
          {expertiseError ? <Text style={styles.errorText}>{expertiseError}</Text> : null}


          <View style={styles. inputBox}>
            <TextInput 
              placeholder="Years of Experience" 
              placeholderTextColor="#000"
              style={styles.input}
              value={experience}
              onChangeText={(t) => {
                setExperience(t);
                if (experienceError) setExperienceError("");
              }}
            />
          </View>
          {experienceError ? <Text style={styles.errorText}>{experienceError}</Text> : null}


          <View style={[styles. inputBox, { height: 50, textAlignVertical: "top" }]} >
            <TextInput
              style={styles.input}
              placeholder="Short Bio, Introduction"
              placeholderTextColor="#000"
              value={bio}
              onChangeText={(t) => {
                setBio(t);
                if (bioError) setBioError("");
              }}
              multiline
            />
          </View>
          {bioError ? <Text style={styles.errorText}>{bioError}</Text> : null}
          
          {/* TERMS */}
         <View style={styles.row}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <Icon 
                name={isChecked ? "checkbox" : "square-outline"} 
                size={22} 
                color={isChecked ? "#7ADAA5" : "rgba(255,255,255,0.4)"} 
              />
            </TouchableOpacity>

            {/* Is View ko dhyan se dekhein, flex: 1 aur flexShrink lazmi hai */}
            <View style={{ flex: 1, marginLeft: 10 }}> 
              <Text style={styles.termsTxt} numberOfLines={2}>
                Agree to <Text style={styles.link}>Terms & Privacy</Text>
              </Text>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.createBtn} onPress={handleRegister}>
            <Text style={styles.createTxt}>Create Account</Text>
          </TouchableOpacity>

        </View>
        
      </View>

      {/* Upload circle */}
        <View style={styles.uploadCircle}>
         <TouchableOpacity>
           <Image style={styles.camIcon} source={require("../../assets/Images/camera.png")}/>
         </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Picture</Text>
          <Text style={styles.uploadText1}>(Optional)</Text>
        </View>

    </ImageBackground>
    </ScrollView>
  );
};

export default ExpertAccount;

const styles = StyleSheet.create({
  // bg: {
  //   flex: ,
  // },

  backBtn: {
    position: "absolute",
    top: 5,
    left: 10,
    height: 40,
    width: 40,
  },

  logoBox: {
    alignItems: "center",
    
  },

  logo: {
    width: 125,
    height: 125,
  },

  account:{
    color:"#fff",
    fontSize:17,
    fontWeight:"bold",
    marginLeft:100,
  },

  cardWrapper: {
    width: 300,
    alignSelf: "center",
    marginTop: 80,
  },

  /** BLUR BOX WRAPPER (Correct) */
  blurContainer: {
    width: "100%",
    height:"86%",
    backgroundColor: "transparent",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF80",
    padding: 15,

  },

  blurFill: {
    ...StyleSheet.absoluteFillObject,
  },

  inputBox: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 18,
    height: 45,
    marginTop:13,
    justifyContent: "center",
  },

  input: {
    color: "#000",
    fontSize: 14,
  },

  otpBtn: {
    position: "absolute",
    right: 10,
    backgroundColor: "#7ADAA5",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },

  otpTxt: {
    fontSize: 10,
    color: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft:30
  },

  termsTxt: {
    color: "#7ADAA5",
    marginLeft:5,
  },

  link: {
    color: "#fff",
    textDecorationLine: "underline",
  },

  createBtn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 35,
  },

  createTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  uploadCircle: {
    position: "absolute",
    alignSelf: "center",
    width: 80,
    height: 80,
    backgroundColor: "black",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    top:160
  },

  uploadText: {
    color: "#fff",
    fontSize: 8,
    marginTop: 1,
  },

  uploadText1: {
    color: "#7ADAA5",
    fontSize: 8,
  },

  camIcon: {
    position:'absolute',
    marginTop:25,
    marginLeft:22,
    height: 18,
    width: 22,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 10,
  },
});
