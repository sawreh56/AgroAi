import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import React, { useState, useEffect } from "react"; // 1. useEffect yahan lazmi check karein
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";

const Otp = () => {
    const [timerCount, setTimer] = useState(60);
    const navigation = useNavigation();
    const [otp, setOtp] = useState(["", "", "", ""]);

    // --- TIMER LOGIC
    useEffect(() => {
        let interval;
        if (timerCount > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerCount]); // [timerCount] likhna zaroori hai taake ye dubara chale

    const handleResend = () => {
        if (timerCount === 0) {
            setTimer(60); // Timer reset ho gaya
        }
    };
    // -------------------------------------------------------

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
                    resizeMode="contain" />
            </View>

            {/* CARD */}
            <View style={styles.cardWrapper}>
                <View style={styles.blurContainer}>
                    <BlurView
                        style={styles.absoluteBlur}
                        blurType="dark"
                        blurAmount={1}
                        reducedTransparencyFallbackColor="black"
                    />
                </View>

                {/* CARD CONTENT */}
                <View style={styles.cardContent}>
                    <View style ={{ flexDirection: "row",}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Image source={require("../../assets/Images/backarrow.png")} style={styles.backIcon} />
                        </TouchableOpacity>
                    
                        <Text style={styles.title}>Verify your Email</Text>

                    </View>

                    <Text style={styles.subtitle}>We've sent a 4-digit code to</Text>
                    <Text style={styles.subtitleBold}>your email</Text>

                    {/* OTP BOXES */}
                    <View style={styles.inputContainer}>
                        <TextInput keyboardType='numeric' maxLength={1} style={styles.inputField}></TextInput>
                        <TextInput keyboardType='numeric' maxLength={1} style={styles.inputField}></TextInput>
                        <TextInput keyboardType='numeric' maxLength={1} style={styles.inputField}></TextInput>
                        <TextInput keyboardType='numeric' maxLength={1} style={styles.inputField}></TextInput>
                    </View>

                    {/* TEXT 1 (Didn't receive code) */}
                    <Text style={styles.text1}>Didn’t receive the code?</Text>

                    {/* RESEND SECTION (Maine iski styling thodi asaan ki hai taake click ho sakay) */}
                    <View style={styles.resendRow}>
                        <TouchableOpacity 
                            onPress={handleResend} 
                            disabled={timerCount > 0}
                        >
                            <Text style={{ 
                                fontSize: 13, 
                                color: timerCount > 0 ? '#666' : 'white',
                                fontWeight: 'bold' 
                            }}>
                                Resend {timerCount === 0 ? "now" : "in"}
                            </Text>
                        </TouchableOpacity>

                        {timerCount > 0 && (
                            <Text style={styles.counter}>
                                00:{timerCount < 10 ? `0${timerCount}` : timerCount}s
                            </Text>
                        )}
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
        flex: 1
        },
    logoBox: {
        alignItems: "center",
        marginTop: 40 
    },
    logo: {
        width: 125,
        height: 125,
        marginLeft: 10 
    },
    cardWrapper: {
        width: 300,
        alignSelf: "center",
        marginTop: 20 
    },
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
        ...StyleSheet.absoluteFillObject
    },
    cardContent: {
        padding: 20,
        position: "absolute",
        top: 0, 
        left: 0, 
        right: 0 
    },
    inputContainer: {
        justifyContent: 'space-between',
        width: '80%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 40,
    },
   backIcon:{
    width:25,
    height:25,
    marginTop:3
   },
    title: {
        fontSize: 22,
        color: "#fff", 
        fontWeight: "500",
        textAlign: "center", 
        marginBottom: 10,
        marginLeft:30
    },
    subtitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 14, 
        marginTop: 20, 
        fontWeight: "400" 
    },
    subtitleBold: {
        textAlign: "center",
        color: "#fff", 
        fontSize: 14,
        fontWeight: "400" 
    },
    inputField: {
        width: '20%',
        paddingVertical: 15,
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        textAlign: 'center'
    },
    text1: {
        color: "#7ADAA5",
        textAlign: 'center', // Isay center kar diya taake button ke upar na aaye
        marginTop: 50,
        fontWeight:"400"
    },
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    counter: { 
        color: "white", 
        fontSize: 14,
         marginLeft: 5 
        },
    btn: {
        width: 210,
        height: 45,
        backgroundColor: "#7ADAA5",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 45,
        marginLeft: 35
    },
    btnText: {
        color: "white", 
        fontSize: 16, 
        fontWeight: "700" 
    },
});