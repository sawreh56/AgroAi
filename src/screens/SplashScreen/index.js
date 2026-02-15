import { StyleSheet, Text, View ,Image, ImageBackground} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation=useNavigation()
  useEffect (()=> {
      setTimeout (()=>{
        navigation.navigate("Onbording")
      },2000)
  },[])

  return (

    <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.background} blurRadius={15}>
      <Image style={styles.LOGO} source={require('../../assets/Images/logo.png')}></Image>
    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LOGO:{
    height:170,
    width:200
  }
})