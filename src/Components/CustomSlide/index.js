import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const CustomSlide = () => {
  return (
    <View style={styles.slide}>
        <Image style={styles.JoinLogo} source={require('../../assets/Images/JoinLogo.png')}></Image>
      </View>
  )
}

export default CustomSlide

const styles = StyleSheet.create({
    slide:{
    backgroundColor:'#FFFFFF',
    height:200,
    width:360,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  JoinLogo:{
    height:140,
    width:135,
    marginLeft:115,
    marginTop:25
  }
})