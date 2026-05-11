import {ImageBackground,StyleSheet,Text,View,Image,TouchableOpacity,TextInput, Alert, ActivityIndicator} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SafeBlurView from "../../Components/SafeBlurView";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { ROLE_FARMER } from "../../constants/roles";
import { api } from "../../api/client";
import { getStoredEmail, setStoredUserName, setStoredUserImage } from "../../services/userStorage";
import { useImagePicker } from "../../hooks/useImagePicker";

const FarmerAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isEdit = route.params?.isEdit || false;
  const [isChecked, setIsChecked] = useState(false);
  const { selectedImage, isLoading, showImagePickerOptions } = useImagePicker();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [farmingType, setFarmingType] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [farmingTypeError, setFarmingTypeError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockedRef = useRef(false);
  const defaultProfileImage = Image.resolveAssetSource(
    require("../../assets/Images/ic_launcher.png.jpeg")
  );

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const storedEmail = await getStoredEmail();
        if (storedEmail) {
          setEmail(storedEmail);
        }
      })();
    }
  }, [isEdit]);

  const handleSubmit = async () => {
    if (submitLockedRef.current) return;
    submitLockedRef.current = true;

    // clear previous errors
    setFullNameError("");
    setPhoneError("");
    setEmailError("");
    setLocationError("");
    setFarmingTypeError("");
    setTermsError("");

    const emailRegex = /\S+@\S+\.\S+/;
    const normalizedEmail = email.trim().toLowerCase();
    const phoneDigits = phone.replace(/\D/g, "");

    let hasError = false;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setFullNameError("Full name is required (min 2 characters).");
      hasError = true;
    }

    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setPhoneError("Please enter a valid phone number (7-15 digits).");
      hasError = true;
    }

    if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!location.trim()) {
      setLocationError("Location is required.");
      hasError = true;
    }

    if (!farmingType.trim()) {
      setFarmingTypeError("Farming type is required.");
      hasError = true;
    }

    if (!isEdit && !isChecked) {
      setTermsError("You must agree to Terms & Privacy.");
      hasError = true;
    }

    if (hasError) {
      submitLockedRef.current = false;
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEdit) {
        // For edit, prepare FormData
        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('email', normalizedEmail);
        formData.append('number', phone);
        formData.append('location', location);
        formData.append('crops_type', farmingType);
        
        // Add image if selected
        if (selectedImage) {
          formData.append('image', {
            uri: selectedImage.uri,
            type: selectedImage.type || 'image/jpeg',
            name: selectedImage.fileName || 'farmer_image.jpg',
          });
          // Use upload method for FormData
          await api.upload('/api/auth/update_farmer', formData);
        } else {
          // If no image, use regular PUT
          await api.put('/api/auth/update_farmer', {
            name: fullName,
            email: normalizedEmail,
            number: phone,
            location,
            crops_type: farmingType,
          });
        }
        // Save updated name and image
        await setStoredUserName(fullName);
        if (selectedImage) {
          await setStoredUserImage(selectedImage.uri);
        }
        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();
      } else {
        // For registration, use FormData
        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('email', normalizedEmail);
        formData.append('number', phone);
        formData.append('location', location);
        formData.append('crops_type', farmingType);
        formData.append('user_type', 'farmer');
        
        formData.append('image', {
          uri: selectedImage?.uri || defaultProfileImage.uri,
          type: selectedImage?.type || 'image/jpeg',
          name: selectedImage?.fileName || 'farmer_image.jpg',
        });
        
        // Use upload method for FormData
        await api.upload('/api/auth/register_farmer', formData);
        
        // Save user name and image after registration
        await setStoredUserName(fullName);
        await setStoredUserImage(selectedImage?.uri || defaultProfileImage.uri);
        
        // On success, navigate to Login to verify email/OTP
        // Role will be set AFTER OTP verification
        navigation.navigate("Login", { role: ROLE_FARMER, email: normalizedEmail });
      }
    } catch (error) {
      Alert.alert('Failed', error.message || 'An error occurred.');
    } finally {
      submitLockedRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <ImageBackground
      source={require("../../assets/Images/bg2.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => isEdit ? navigation.goBack() : navigation.navigate("RoleSelect")}>
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

      <Text style={styles.account}>{isEdit ? 'Update Farmer Profile' : 'Create Farmer Account'}</Text>

      {/* CARD */}
      <View style={styles.cardWrapper}>


        {/* BLUR BOX */}
        <View style={styles.blurContainer}>
          <SafeBlurView
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
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Location / Address"
              placeholderTextColor="#000"
              style={styles.input}
              value={location}
              onChangeText={(t) => {
                setLocation(t);
                if (locationError) setLocationError("");
              }}
            />
          </View>
          {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Farming type / Crops"
              placeholderTextColor="#000"
              style={styles.input}
              value={farmingType}
              onChangeText={(t) => {
                setFarmingType(t);
                if (farmingTypeError) setFarmingTypeError("");
              }}
            />
          </View>
          {farmingTypeError ? <Text style={styles.errorText}>{farmingTypeError}</Text> : null}

          {!isEdit && (
            <>
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
              {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}
            </>
          )}

          {/* BUTTON */}
          <TouchableOpacity
            style={[styles.createBtn, isSubmitting && styles.disabledBtn]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.createTxt}>{isEdit ? 'Update Profile' : 'Create Account'}</Text>
            )}
          </TouchableOpacity>

        </View>

      </View>

       <View style={styles.uploadCircle}>
                          <TouchableOpacity onPress={showImagePickerOptions} disabled={isLoading || isSubmitting}>
                              {selectedImage ? (
                                  <Image
                                      style={styles.selectedImage}
                                      source={{ uri: selectedImage.uri }}
                                  />
                              ) : (
                                  <View style={styles.camContainer}>
                                      {isLoading ? (
                                          <ActivityIndicator size="small" color="#7ADAA5" />
                                      ) : (
                                          <Image style={styles.camIcon} source={require("../../assets/Images/camera.png")} />
                                      )}
                                  </View>
                              )}
                          </TouchableOpacity>
                          
                        
                          {!selectedImage && !isLoading && (
                              <>
                                  <Text style={styles.uploadText}>Upload Picture</Text>
                                  <Text style={styles.uploadText1}>(Optional)</Text>
                              </>
                          )}
                      </View>

    </ImageBackground>
    </ScrollView>
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

  disabledBtn: {
    opacity: 0.7,
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
  selectedImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 18,
  },
});
