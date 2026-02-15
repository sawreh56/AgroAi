import {ImageBackground,StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from "react-native";
import React, { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const FarmerAccount = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  return (
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

      <Text style={styles.account}>Create Farmer Account</Text>

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
            <TextInput placeholder="Full Name" placeholderTextColor="#000" style={styles.input} />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="+92 3XX-XXXXXXX"
              placeholderTextColor="#000"
              style={styles.input}
              keyboardType="phone-pad"
            />
            
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email (Required)"
              placeholderTextColor="#000"
              style={styles.input}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Location / Address"
              placeholderTextColor="#000"
              style={styles.input}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Farming type / Crops"
              placeholderTextColor="#000"
              style={styles.input}
            />
          </View>

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
          <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate("CongratulationFarmer")}>
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
  );
};

export default FarmerAccount;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  backBtn: {
    position: "absolute",
    top: 20,
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
    marginLeft:100
  },

  cardWrapper: {
    width: 300,
    alignSelf: "center",
    marginTop: 80,
  },

  /** BLUR BOX WRAPPER (Correct) */
  blurContainer: {
    width: "100%",
    height:"85.5%",
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
    height: 47,
    marginTop:15,
    justifyContent: "center",
  },

  input: {
    color: "#000",
    fontSize: 14,
  },

  otpBtn: {
    position: "absolute",
    right: 10,
    top: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
    marginLeft: 20,
    width: '100%', 
},
  termsTxt: {
    color: '#7ADAA5', 
    fontSize: 14,
    flexWrap: 'wrap',
    fontWeight:"400"
},
link: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '400',
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
});
