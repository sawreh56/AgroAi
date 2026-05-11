import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SafeBlurView from "../../Components/SafeBlurView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "../../api/client";
import { setStoredEmail } from "../../services/userStorage";
import { useRole } from "../../context/RoleContext";
import { ROLE_FARMER, ROLE_EXPERT } from "../../constants/roles";

const Otp = () => {
    const [timerCount, setTimer] = useState(60);
    const [otpError, setOtpError] = useState("");
    const navigation = useNavigation();
    const route = useRoute();
    const { setRole } = useRole();
    const email = route.params?.email || "";
    const role = route.params?.role || null;
    const isNewRegistration = route.params?.isNewRegistration || false;
    const bypassMode = route.params?.bypassMode || false;
    const [otp, setOtp] = useState(["", "", "", ""]);
       const inputRefs = useRef([]);

       const handleChange = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ✅ ADD THIS (missing function)
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

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

    const handleResend = async () => {
        if (timerCount !== 0) return;
        if (!email) {
            Alert.alert('Resend Failed', 'Email not available for resend.');
            return;
        }

        setTimer(60);
        try {
            await api.post('/api/auth/login', { email });
        } catch (error) {
            const message = error?.message || 'Unable to resend OTP. Please try again.';
            Alert.alert('Resend Failed', message);
        }
    };

    const handleVerifyOtp = async () => {
        setOtpError("");
        const code = otp.join("").trim();

        if (!email) {
            Alert.alert('Verification Failed', 'Email is missing from the verification flow.');
            return;
        }

        if (code.length < 4) {
            setOtpError('Enter the full 4-digit OTP.');
            return;
        }

        try {
            // 🔧 BYPASS MODE - Accept any OTP
            if (!bypassMode) {
                await api.post('/api/auth/verify_otp', { email, otp: code });
            }
            
            await setStoredEmail(email);
            
            // Set role AFTER successful OTP verification
            if (role === ROLE_FARMER) {
                await setRole(ROLE_FARMER);
                // If new registration, show congratulation screen; otherwise go directly to home
                if (isNewRegistration) {
                    navigation.navigate("CongratulationFarmer");
                } else {
                    navigation.replace("FarmerApp");
                }
            } else if (role === ROLE_EXPERT) {
                await setRole(ROLE_EXPERT);
                // If new registration, show congratulation screen; otherwise go directly to home
                if (isNewRegistration) {
                    navigation.navigate("CongratulationExprt");
                } else {
                    navigation.replace("ExpertApp");
                }
            } else {
                // If no role was captured, go to Guest
                navigation.navigate("Guest");
            }
        } catch (error) {
            const message = error?.message || 'OTP is invalid or expired.';
            setOtpError(message);
        }
    };
    // -------------------------------------------------------

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
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
                    <SafeBlurView
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

                    {/* 🔧 BYPASS MODE INDICATOR */}
                    {bypassMode && (
                        <View style={{ backgroundColor: 'rgba(122, 218, 165, 0.3)', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginVertical: 8 }}>
                            <Text style={{ color: '#7ADAA5', fontSize: 11, textAlign: 'center', fontWeight: '600' }}>
                                ✓ Dev Mode Active - Any OTP accepted
                            </Text>
                        </View>
                    )}

                    <Text style={styles.subtitle}>We've sent a 4-digit code to</Text>
                    <Text style={styles.subtitleBold}>{email || 'your email'}</Text>

                    {/* OTP BOXES */}
                    <View style={styles.inputContainer}>
  {otp.map((digit, index) => (
    <TextInput
      key={index}
      ref={(ref) => (inputRefs.current[index] = ref)}
      value={digit}
      onChangeText={(text) => handleChange(text, index)}
      onKeyPress={(e) => handleKeyPress(e, index)}
      keyboardType="numeric"
      maxLength={1}
      style={styles.inputField}
    />
  ))}
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

{otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
                    <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp}>
                        <Text style={styles.btnText}>Verify OTP</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ImageBackground>
        </ScrollView>
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
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
});