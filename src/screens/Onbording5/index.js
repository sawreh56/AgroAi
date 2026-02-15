import { StyleSheet, Text, View ,Image,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Onbording5 = () => {
  const navigation=useNavigation()
  return (
    <ImageBackground source={require('../../assets/Images/back5.jpg')} style={styles.bg} blurRadius={3}>
          
      <View style={styles.overlay} />
                
      <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
                
                
      <Text style={styles.title}>AgroDirect: Farm-to-Home</Text>
      <Text style={styles.desc}>Farmers sell direct, earn more. Buyers</Text>
      <Text style={styles.desc1}>get fresh produce.</Text>
            
                
      <View >
        <Image source={require('../../assets/Images/dot5.png')} style={styles.dot}/>
                
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RoleSelect")}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
  )
}

export default Onbording5

const styles = StyleSheet.create({
  bg: { 
    flex: 1,
    paddingTop: 80, 
    paddingHorizontal: 25
  },
  logo: {
    width: 140, 
    height: 140,
    alignSelf: "center",
    marginTop: 60,
    tintColor: "#fff" 
  },
  title: {
    color: "white", 
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 75,
    marginLeft:1
  },
  desc: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    marginLeft:20
  },
  desc1: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    marginLeft:90
  },

 dot:{
    height:10,
    width:80,
    marginLeft:126,
    marginTop:120
  },
  
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // DARK LEVEL
  },
   btn: {
    backgroundColor: "#63E6BE",   
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,             
    alignItems: "center",
    justifyContent: "center",
    alignSelf:"center",
    marginTop:30,
    width:200,
    height:50
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
})