import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Onbording3 = () => {
  const navigation=useNavigation()
  return (
    <ImageBackground source={require('../../assets/Images/back3.jpg')} style={styles.bg} blurRadius={3}>
        
      <View style={styles.overlay} />
        
      <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
        
        
      <Text style={styles.title}>AI-Powered Disease Detection</Text>
      <Text style={styles.desc}>Scan plants, get instant diagnosis</Text>
      <Text style={styles.desc1}> & treatment plans.</Text>
    
        
      <Image source={require('../../assets/Images/dot3.png')} style={styles.dot}/>
        
      <View style={styles.bottomBox}>
        <TouchableOpacity onPress={() => navigation.navigate("Onbording4")}>
          <Image source={require('../../assets/Images/next.png')} style={styles.nextBtn} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Onbording3

const styles = StyleSheet.create({
   bg: { 
      flex: 1,
      paddingTop: 80, 
      paddingHorizontal: 25
    },
    logo: {
      width: 130, 
      height: 130,
      alignSelf: "center",
      marginTop: 40,
      tintColor: "#fff" 
    },
    title: {
      color: "white", 
      fontSize: 23,
      fontWeight: "bold",
      marginTop: 80,
      marginLeft:5
    },
    desc: {
      color: "#fff", 
      fontSize: 17,
      marginTop: 5, 
      width: 260,
      marginLeft:35
    },
    desc1: {
      color: "#fff", 
      fontSize: 17,
      marginTop: 5, 
      width: 260,
      marginLeft:78
    },
    desc2: {
      color: "#fff", 
      fontSize: 17,
      marginTop: 5, 
      width: 260,
      marginLeft:95
    },
   dot:{
    height:10,
    width:80,
    marginLeft:126,
    marginTop:125
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
      height: 60
    },
    skip: {
  color: "white",
  marginTop: 30,
  width: 100, 
  textAlign: 'center', 
  marginRight:4
},
})