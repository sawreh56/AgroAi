import {ImageBackground,StyleSheet,Text,View,Image,TouchableOpacity,Animated,Dimensions,} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SafeBlurView from "../../Components/SafeBlurView";

const { width, height } = Dimensions.get("window");

// 🌿 SINGLE LEAF
const Leaf = ({ delay, x }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(-120);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height + 100, // 👈 full screen bottom
          duration: 6000 + Math.random() * 3000,
          delay,
          useNativeDriver: true,
        }),

        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, [delay, opacity, translateY]);

  return (
    <Animated.Image
      source={require("../../assets/Images/Sprinkle.png")}
      style={{position: "absolute",width: 35,height: 35,left: x,transform: [{ translateY }], opacity,}}
      resizeMode="contain"/>
  );
};

const CongratulationFarmer = () => {
  const navigation = useNavigation();

  // 🌿 FIXED LEAVES (NO RANDOM IN RENDER)
  const [leaves] = useState(
    [...Array(70)].map(() => ({
      x: Math.random() * width,
      delay: Math.random() * 8000,
    }))
  );

  return (
    <ImageBackground
      style={styles.bg}
      source={require("../../assets/Images/bg2.png")}
    >
      {/* 🌿 LEAVES LAYER */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {leaves.map((item, i) => (
          <Leaf key={i} delay={item.delay} x={item.x} />
        ))}
      </View>

      {/* LOGO */}
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/Images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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

        <Image
          style={styles.pic}
          source={require("../../assets/Images/CongratulationFarmer.jpg")}
        />

        <Text style={styles.Welcom}>Welcome Respected Farmer</Text>
        <Text style={styles.text}>Get ready to transform your</Text>
        <Text style={styles.text2}>farm with smart insights and</Text>
        <Text style={styles.text3}>expert help.</Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.replace("FarmerApp")}
        >
          <Text style={styles.createTxt}>Explore more Features</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CongratulationFarmer;
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
    marginLeft: 10,
  },

  cardWrapper: {
    width: 300,
    alignSelf: "center",
    padding: 15,
  },

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

  pic: {
    height: 240,
    width: 240,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#7ADAA5",
    marginLeft: 19,
  },

  Welcom: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginLeft: 30,
    marginTop: 25,
  },

  text: {
    color: "#fff",
    marginLeft: 51,
    marginTop: 10,
    fontWeight: "300",
  },

  text2: {
    color: "#fff",
    marginLeft: 50,
    fontWeight: "300",
  },

  text3: {
    color: "#fff",
    marginLeft: 100,
    fontWeight: "300",
  },

  createBtn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 35,
    marginLeft: 6,
  },

  createTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});