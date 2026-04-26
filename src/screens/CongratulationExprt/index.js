import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SafeBlurView from "../../Components/SafeBlurView";

const { width, height } = Dimensions.get("window");

// 🌿 Leaf Component (INSTANT START FIX)
const Leaf = ({ delay, x }) => {
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const start = () => {
    translateY.setValue(-120);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height + 120,
        duration: 3500 + Math.random() * 2500,
        delay,
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => start());
  };

  useEffect(() => {
    // ⚡ INSTANT START (NO DELAY SYSTEM)
    start();
  }, []);

  return (
    <Animated.Image
      source={require("../../assets/Images/Sprinkle.png")}
      style={{
        position: "absolute",
        width: 30,
        height: 30,
        left: x,
        transform: [{ translateY }],
        opacity,
      }}
      resizeMode="contain"
    />
  );
};

const CongratulationExprt = () => {
  const navigation = useNavigation();

  // 🌿 OPTIMIZED LEAVES
  const [leaves] = useState(
    [...Array(60)].map(() => ({
      x: Math.random() * width,
      delay: Math.random() * 5000,
    }))
  );

  return (
    <ImageBackground
      style={styles.bg}
      source={require("../../assets/Images/bg2.png")}
    >
      {/* 🌿 LEAVES */}
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
          source={require("../../assets/Images/CongratulationExprt.jpg")}
        />

        <Text style={styles.Welcom}>Welcome ,Dr. Irfan</Text>
        <Text style={styles.text}>Get ready to empower farmers</Text>
        <Text style={styles.text2}>with your valuable insights</Text>
        <Text style={styles.text3}>and expertise.</Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("ExpetHome")}
        >
          <Text style={styles.createTxt}>Explore more Features</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CongratulationExprt;
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
    fontSize: 23,
    fontWeight: "600",
    marginLeft: 40,
    marginTop: 18,
  },

  text: {
    color: "#fff",
    marginLeft: 38,
    marginTop: 20,
    fontWeight: "300",
  },

  text2: {
    color: "#fff",
    marginLeft: 59,
    fontWeight: "300",
  },

  text3: {
    color: "#fff",
    marginLeft: 98,
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