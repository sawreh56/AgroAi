import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,TextInput } from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Otp = () => {
    const [timerCount, setTimer] = useState(60)
    const navigation=useNavigation()
      const [otp, setOtp] = useState(["", "", "", ""]);

  
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
            <View style={styles.cardContent}>

                
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.arrow}>&lt;</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Verify your Phone{"\n"}Number</Text>
                <Text style={styles.subtitle}>We've sent a 4-digit code to</Text>
                <Text style={styles.subtitleBold}>+92 3XX-XXXXXXX</Text>

                {/* OTP BOXES */}
                <View style={styles.inputContainer}>
                    <TextInput keyboardType = 'numeric' maxLength={1} style={styles.inputField}></TextInput>
                    <TextInput keyboardType = 'numeric' maxLength={1} style={styles.inputField}></TextInput>
                    <TextInput keyboardType = 'numeric' maxLength={1}  style={styles.inputField}></TextInput>
                    <TextInput keyboardType = 'numeric' maxLength={1}  style={styles.inputField}></TextInput>
                </View>

                <TouchableOpacity>
                    <Text style={styles.text1}>Didn’t receive the code?</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:'auto',textAlign:'center',flexDirection:'row',marginTop:5}}>
                    <TouchableOpacity>
                        <Text style={{fontSize:13,color:'white'}}>Resend in</Text>
                    </TouchableOpacity>
                    <Text style={styles.counter} >(00:{timerCount})</Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Guest")}>
                    <Text style={styles.btnText}>Send OTP</Text>
                </TouchableOpacity>

            </View>
            

        </View>

      
    </ImageBackground>
  );
};

export default Otp;

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
    borderRadius: 10,
    overflow: "hidden",
    height: 460,
    width: 290,
    borderWidth: 1,
    borderColor: "#FFFFFF80",
    marginLeft: 10,
},

absoluteBlur: {
    ...StyleSheet.absoluteFillObject,
  },

cardContent: {
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
},

inputContainer: {
    justifyContent: 'space-between',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40,
},


    arrow: {
        fontSize: 28,
        color: "#fff",
        
    },

    
    title: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        textAlign: "center",
        color: "#ccc",
        fontSize: 14,
        marginTop:10
    },

    subtitleBold: {
        textAlign: "center",
        color: "#fff",
        fontSize: 14,
        
    },
    // inputContainer: {

    //     justifyContent: 'space-between',
    //     width: '80%',
    //     flexDirection: 'row',
    //     margin:'auto',
    //     marginTop:40
    // },
    inputField: {
        width: '20%',
        paddingVertical:15,
        backgroundColor:"rgba(255,255,255,0.4)",
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#D1D1D1',
        textAlign:'center'
    },
    counter:{
        color:"white",
        fontSize:14,
        marginLeft:5
    },

    text1:{
        color:"#7ADAA5",
        marginLeft:65,
        marginTop:50
        
    },

    btn: {
        width: 210,
        height:45,
        backgroundColor: "#7ADAA5",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 45,
        marginLeft:35
    },

    btnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },




  });
