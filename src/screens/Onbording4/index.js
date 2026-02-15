import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Onbording4 = () => {
  const navigation=useNavigation()
  return (
     <ImageBackground source={require('../../assets/Images/back4.jpg')} style={styles.bg} blurRadius={3}>
            
          <View style={styles.overlay} />
            
          <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
            
            
          
          
          <Text style={styles.title}>Instant Expert Guidance</Text>
          <Text style={styles.desc}>Connect with agricultural experts to</Text>
          <Text style={styles.desc1}>solve your farming challenges</Text>
          <Text style={styles.desc2}> quickly and efficiently.</Text>
        
            
          <Image source={require('../../assets/Images/dot4.png')} style={styles.dot}/>
            
          <View style={styles.bottomBox}>
            <TouchableOpacity onPress={() => navigation.navigate("Onbording5")}>
              <Image source={require('../../assets/Images/next.png')} style={styles.nextBtn} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")} >
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
  )
}

export default Onbording4

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
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 55,
    marginLeft:18
  },
    desc: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    marginLeft:27
  },
   desc1: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    marginLeft:52
  },
    desc2: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    marginLeft:70
  },
    
    dot:{
    height:10,
    width:80,
    marginLeft:126,
    marginTop:115
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