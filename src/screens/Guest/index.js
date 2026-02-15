import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,TextInput } from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Guest = () => {
    const navigation=useNavigation()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [activeTab, setActiveTab] = useState("guest");
  
  return (
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
      resizeMode="cover">

      {/* LOGO */}
        <View style={styles.logoBox}>
            <Image
            source={require("../../assets/Images/logo.png")}
            style={styles.logo}
            resizeMode="contain"/>
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
            <View style={styles.cardContent}></View>

            {/* Tabs */}
          {/* Tabs */}
          <View style={styles.tabHolder}>
            <TouchableOpacity
              onPress={() => {
              setActiveTab("login");
              navigation.navigate("Login"); // Login screen ka name yahan likhein
             }}
              style={[
              styles.tab,
              activeTab === "login" ? styles.tabActiveLeft : null,
              ]}
              >
              <Text style={[styles.tabText, activeTab === "login" ? styles.tabTextActive : null]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("guest")} // Guest par isi screen par rahe ga
              style={[
              styles.tab,
              activeTab === "guest" ? styles.tabActiveRight : null,
              ]}
              >
              <Text style={[styles.tabText, activeTab === "guest" ? styles.tabTextActive : null]}>
              Guest
              </Text>
            </TouchableOpacity>
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Continue as Guest</Text>
          <Text style={styles.subHeading}>
            Enter your details to personalize your{"\n"}Experience.
          </Text>

          {/* Inputs */}
          <View style={styles.inputWrap}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
              placeholderTextColor="#000000"
              style={styles.input}
            />
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Location (optional)"
              placeholderTextColor="#000000"
              style={[styles.input, { marginTop: 14 }]}
            />
          </View>

          {/* Continue button */}
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate("FarmerTabs")}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          {/* Bottom text */}
         <View style={{ flexDirection: "row",marginTop: 10, }}>
           <Text style={styles.footer}>Later,</Text>
            <TouchableOpacity>
              <Text 
                style={styles.link} 
                onPress={() => navigation.navigate("RoleSelect")}>
                I want to create my Account
              </Text>
            </TouchableOpacity>
          </View>
          
                  
        </View>

      
    </ImageBackground>
  );
};

export default Guest;

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
        marginLeft:10,
        
    },

    cardWrapper: {
        width: 300,
        alignSelf: "center",
        padding:15,
    },

  /** BLUR BOX WRAPPER */
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        overflow: "hidden",
        height: 490,
        width: 310,
        borderWidth: 1,
        borderColor: "#FFFFFF80",
        
    },

    absoluteBlur: {
        ...StyleSheet.absoluteFillObject,
    },

  /** CARD CONTENT ABOVE BLUR */
    cardContent: {
        borderRadius: 20,
        paddingHorizontal: 20,
    },

    tabHolder: {
        width: 210,
        height: 44,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        overflow: "hidden",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 6,
        marginBottom: 18,
        marginLeft:20,
        backgroundColor: "transparent",
    },

    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    tabActiveLeft: {
        backgroundColor: "#7ADAA5",
    },

    tabActiveRight: {
        backgroundColor: "#7ADAA5",
    },

    tabText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },

    tabTextActive: {
        color: "white", // darker text on active green pill
    },

    heading: {
        textAlign: "center",
        color: "#fff",
        fontSize: 23,
        fontWeight: "600",
        marginTop: 30,
        
    },

  subHeading: {
    textAlign: "center",
    color: "#dfeee7",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 18,
    fontFamily:"400"
  },

  inputWrap: {
    marginTop: 22,
    alignItems: "center",
  },

  input: {
    width: "90%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.4)",
    paddingHorizontal: 18,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#FFFFFF99",
    fontSize: 14,
    
    
  },

  continueBtn: {
    width: "88%",
    height: 54,
    borderRadius: 28,
    backgroundColor: "#7ADAA5",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 45,
    
  },

  continueText: {
    color: "#FFFFFF99",
    fontWeight: "800",
    fontSize: 18,
  },

  footer: {
    color: "#66E3B6",
    fontSize: 13,
    marginTop:15,
    marginLeft:35
  },

  link: {
    color: "#ffffff",
    fontWeight: "600",
    marginTop:15,
    marginLeft:5
  },
});
