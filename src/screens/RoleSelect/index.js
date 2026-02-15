import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";


const RoleSelect = () => {
    const navigation=useNavigation()
  
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
            blurAmount={1}
            reducedTransparencyFallbackColor="black"
          />
        </View>

        {/* CARD CONTENT (above blur) */}
        <View style={styles.cardContent}>
          <Text style={styles.title}>Join Agro AI</Text>

          <Text style={styles.subtitle}>
            How would you like to use our platform?
          </Text>

          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("FarmerAccount")}>
            <Text style={styles.btnText}>I am a Farmer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ExpertAccount")}>
            <Text style={styles.btnText}>I am an Expert</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>Learn more about roles</Text>
          </TouchableOpacity>
          <Text style={styles.or}>Or</Text>

          <View style={{flexDirection:'row' , marginLeft:25}}>
           <Text style={styles.login}>Already have an account?</Text>
            <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </ImageBackground>
  );
};

export default RoleSelect;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  logoBox: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 125,
    height: 125,
    marginLeft:10
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
    height: 390,
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

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#ddd",
    fontSize: 13,
    fontWeight:400,
    textAlign: "center",
    marginTop: 50,
    marginLeft:10
  },

  btn: {
    backgroundColor: "#7ADAA5",
    height:50,
    width:200,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 6,
    marginLeft:25

  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  link: {
    fontSize:13,
    fontWeight:400,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
    marginRight:10,

  },

  or: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
    marginRight:10

  },

  login: {
    color: "#7ADAA5",
    // textAlign: "center",
    width:'70%'
  },

  loginLink: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft:5
    
  },
});
