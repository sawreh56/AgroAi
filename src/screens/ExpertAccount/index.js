import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SafeBlurView from "../../Components/SafeBlurView";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ROLE_EXPERT } from "../../constants/roles";
import { api } from "../../api/client";
import { getStoredEmail, setStoredUserName, setStoredUserImage } from "../../services/userStorage";
import { useImagePicker } from "../../hooks/useImagePicker";

const ExpertAccount = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isEdit = route.params?.isEdit || false;
    const [isChecked, setIsChecked] = useState(false);
    const { selectedImage, isLoading, showImagePickerOptions } = useImagePicker();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [expertise, setExpertise] = useState("");
    const [experience, setExperience] = useState("");
    const [bio, setBio] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [expertiseError, setExpertiseError] = useState("");
    const [experienceError, setExperienceError] = useState("");
    const [bioError, setBioError] = useState("");
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

        setFullNameError("");
        setPhoneError("");
        setEmailError("");
        setLocationError("");
        setExpertiseError("");
        setExperienceError("");
        setBioError("");

        const emailRegex = /\S+@\S+\.\S+/;
        const normalizedEmail = email.trim().toLowerCase();
        const phoneDigits = phone.replace(/\D/g, "");

        let hasError = false;

        if (!isEdit && !isChecked) {
            Alert.alert("Terms Required", "Please agree to the Terms & Privacy to continue.");
            submitLockedRef.current = false;
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

        if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }

        if (!location.trim()) {
            setLocationError("Location is required.");
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

        if (hasError) {
            submitLockedRef.current = false;
            return;
        }

        setIsSubmitting(true);
        try {
            if (isEdit) {
                const formData = new FormData();
                formData.append('name', fullName);
                formData.append('email', normalizedEmail);
                formData.append('number', phone);
                formData.append('expertise', expertise);
                formData.append('experiance', experience);
                formData.append('bio', bio);

                if (selectedImage) {
                    formData.append('image', {
                        uri: selectedImage.uri,
                        type: selectedImage.type || 'image/jpeg',
                        name: selectedImage.fileName || 'expert_image.jpg',
                    });
                    await api.upload('/api/auth/update_expert', formData);
                } else {
                    await api.put('/api/auth/update_expert', {
                        name: fullName,
                        email: normalizedEmail,
                        number: phone,
                        expertise,
                        experiance: experience,
                        bio,
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
                const formData = new FormData();
                formData.append('name', fullName);
                formData.append('email', normalizedEmail);
                formData.append('number', phone);
                formData.append('location', location);
                formData.append('expertise', expertise);
                formData.append('experiance', experience);
                formData.append('bio', bio);
                formData.append('user_type', 'expert');

                formData.append('image', {
                    uri: selectedImage?.uri || defaultProfileImage.uri,
                    type: selectedImage?.type || 'image/jpeg',
                    name: selectedImage?.fileName || 'expert_image.jpg',
                });

                const response = await api.upload('/api/auth/register_expert', formData);
                // Save user name and image after registration
                await setStoredUserName(fullName);
                await setStoredUserImage(selectedImage?.uri || defaultProfileImage.uri);
                navigation.navigate("Login", { role: ROLE_EXPERT, email: normalizedEmail });
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
                <TouchableOpacity onPress={() => isEdit ? navigation.goBack() : navigation.navigate("RoleSelect")}>
                    <Image style={styles.backBtn} source={require("../../assets/Images/arrow.png")} />
                </TouchableOpacity>

                <View style={styles.logoBox}>
                    <Image
                        source={require("../../assets/Images/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.account}>{isEdit ? 'Update Expert Profile' : 'Create Expert Account'}</Text>

                <View style={styles.cardWrapper}>
                    <View style={styles.blurContainer}>
                        <SafeBlurView
                            style={styles.blurFill}
                            blurType="dark"
                            blurAmount={8}
                            reducedTransparencyFallbackColor="black"
                        />

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
                                placeholder="Area of Expertise"
                                placeholderTextColor="#000"
                                style={styles.input}
                                value={expertise}
                                onChangeText={(t) => {
                                    setExpertise(t);
                                    if (expertiseError) setExpertiseError("");
                                }}
                            />
                        </View>
                        {expertiseError ? <Text style={styles.errorText}>{expertiseError}</Text> : null}

                        <View style={styles.inputBox}>
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

                        <View style={[styles.inputBox, { height: 50, textAlignVertical: "top" }]} >
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

                        {!isEdit && (
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                                    <Icon
                                        name={isChecked ? "checkbox" : "square-outline"}
                                        size={22}
                                        color={isChecked ? "#7ADAA5" : "rgba(255,255,255,0.4)"}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.termsTxt} numberOfLines={2}>
                                        Agree to <Text style={styles.link}>Terms & Privacy</Text>
                                    </Text>
                                </View>
                            </View>
                        )}

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

export default ExpertAccount;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        paddingBottom: 20,
    },
    backBtn: {
        position: "absolute",
        top: 20,
        left: 10,
        height: 40,
        width: 40,
        zIndex: 10,
    },
    logoBox: {
        alignItems: "center",
        marginTop: 10,
    },
    logo: {
        width: 125,
        height: 125,
    },
    account: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: 'center',
    
    },
    cardWrapper: {
        width: 300,
        alignSelf: "center",
        marginTop: 60,
    },
    blurContainer: {
        width: "100%",
        backgroundColor: "transparent",
        borderRadius: 15,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#FFFFFF80",
        padding: 15,
        paddingTop: 40, 
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
        marginTop: 13,
        justifyContent: "center",
    },
    input: {
        color: "#000",
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingHorizontal: 10
    },
    termsTxt: {
        color: "#7ADAA5",
    },
    link: {
        color: "#fff",
        textDecorationLine: "underline",
    },
    createBtn: {
        backgroundColor: "#7ADAA5",
        paddingVertical: 13,
        borderRadius: 30,
        marginTop: 25,
        marginBottom: 10,
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
        width: 90,
        height: 90,
        backgroundColor: "black",
        borderRadius: 45,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        top: 165, 
        zIndex: 100,
    },
    camContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadText: {
        color: "#fff",
        fontSize: 8,
        marginTop: 2,
    },
    uploadText1: {
        color: "#7ADAA5",
        fontSize: 8,
        marginBottom: 15,
    },
    camIcon: {
        height: 20,
        width: 24,
        resizeMode: 'contain',
        marginLeft: 80,
        marginTop: 70,
    },
    selectedImage: {
        height: 88,
        width: 88,
        borderRadius: 44,
        resizeMode: 'cover',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 11,
        marginTop: 2,
        marginLeft: 15,
    },
});