import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding() {
   const navigation=useNavigation()
 

  return (
    <ImageBackground source={require('../../assets/Images/back2.jpg')} style={styles.bg} blurRadius={3}>

      <View style={styles.overlay} />

      <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />


      <Text style={styles.title}>Welcome to Agro AI</Text>
      <Text style={styles.desc}>Your smart partner for modern </Text>
      <Text style={styles.desc1}>farming solutions</Text>

      <Image source={require('../../assets/Images/dot1.png')} style={styles.dot}/>

      <View style={styles.bottomBox}>
        <TouchableOpacity onPress={() => navigation.navigate("Onbording2")}>
          <Image source={require('../../assets/Images/next.png')} style={styles.nextBtn} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1,
    paddingTop: 80, 
    paddingHorizontal: 25
  },
  logo: {
    width: 135, 
    height: 135,
    alignSelf: "center",
    marginTop: 45,
    tintColor: "#fff" 
  },
  title: {
    color: "white", 
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 85,
    marginLeft:50
  },
  desc: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    width: 250,
    marginLeft:50
  },
  desc1: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    width: 250,
    marginLeft:95
  },
  dot:{
    height:10,
    width:80,
    marginLeft:128,
    marginTop:110
  },

  bottomBox: {
    position: "absolute",
    bottom:100,
    alignSelf: "center",
    alignItems: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // DARK LEVEL
  },
  nextBtn: {
    width: 60, 
    height: 60,

  },
  skip: {
  color: "white",
  marginTop: 30,
  width: 100, 
  textAlign: 'center', 
  marginRight:5
},
});
