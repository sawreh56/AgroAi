import { ImageBackground,StyleSheet,Text,View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from "@react-native-community/blur";


const CongratulationFarmer= () => {
  const navigation = useNavigation()
  return (
    <ImageBackground style={styles.bg} source={require("../../assets/Images/bg2.png")}>

      {/* LOGO */}
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/Images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CARD WITH BLUR BEHIND ONLY */}
        <View style={styles.cardWrapper}>

         {/* Blur only in this box (Android-safe) */}
          <View style={styles.blurContainer}>
            <BlurView
              style={styles.absoluteBlur}
              blurType="dark"
              blurAmount={1}
              reducedTransparencyFallbackColor="black"
            />
          </View>

          {/* CARD CONTENT (above blur) */}
          <View style={styles.cardContent}></View>

          <Image style={styles.pic} source={require("../../assets/Images/CongratulationFarmer.jpg")}></Image>
          <Text style={styles.Welcom}>Welcome Respected Farmer</Text>
          <Text style={styles.text}> Get ready to transform your</Text>
          <Text style={styles.text2}>farm with smart insights and </Text>
          <Text style={styles.text3}>expert help.</Text>

          {/* BUTTON */}
          <TouchableOpacity style={styles.createBtn}  onPress={() => navigation.navigate("Home")}>
            <Text style={styles.createTxt}>Explore more Features</Text>
          </TouchableOpacity>
          

        </View>

    </ImageBackground>
  )
}

export default CongratulationFarmer


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
        marginLeft:10,
        
    },

    cardWrapper: {
        width: 300,
        alignSelf: "center",
        padding:15,
    },

  /** BLUR BOX WRAPPER */
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

  /** CARD CONTENT ABOVE BLUR */
    cardContent: {
        borderRadius: 20,
        paddingHorizontal: 20,
    },

  pic:{
    height:240,
    width:240,
    borderRadius:25,
    borderWidth:3,
    borderColor:'#7ADAA5',
    marginLeft:19
  },
  Welcom:{
    color:"#fff",
    fontSize:18,
    fontWeight:"600",
    marginLeft:30,
    marginTop:18
  },
  text:{
    color:'#fff',
    marginLeft:51,
    marginTop:20
  },
  text2:{
    color:'#fff',
    marginLeft:50,
    
  },
  text3:{
    color:'#fff',
    marginLeft:100,
  },

  createBtn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 35,
    marginLeft:6
  },

  createTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

})