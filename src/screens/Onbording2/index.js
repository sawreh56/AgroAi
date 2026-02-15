import { StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Onbording2 = ({onNext}) => {
     const navigation=useNavigation()
  
  return (
     <ImageBackground source={require('../../assets/Images/back1.jpg')} style={styles.bg} blurRadius={3}>
    
          <View style={styles.overlay} />
    
          <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
    
    
          <Text style={styles.title}>Smart Crop Selection</Text>
          <Text style={styles.desc}>Get AI-driven recommendations</Text>
          <Text style={styles.desc1}>for the best crops suited to </Text>
          <Text style={styles.desc2}>your land & climate. </Text>

    
          <Image source={require('../../assets/Images/dot2.png')} style={styles.dot}/>
    
          <View style={styles.bottomBox}>
            <TouchableOpacity onPress={() => navigation.navigate("Onbording3")}>
              <Image source={require('../../assets/Images/next.png')} style={styles.nextBtn} />
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
  )
}

export default Onbording2

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
    marginTop: 30,
    tintColor: "#fff" 
  },
  title: {
    color: "white", 
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft:48
  },
  desc: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    width: 250,
    marginLeft:52
  },
  desc1: {
    color: "#fff", 
    fontSize:17,
    marginTop: 5, 
    width: 250,
    marginLeft:68
  },
  desc2: {
    color: "#fff", 
    fontSize: 17,
    marginTop: 5, 
    width: 250,
    marginLeft:95
  },
 dot:{
    height:10,
    width:80,
    marginLeft:126,
    marginTop:130
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
});
