import { Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRole } from '../../context/RoleContext'
import { ROLE_EXPERT, ROLE_FARMER } from '../../constants/roles'

const SplashScreen = () => {
  const navigation = useNavigation()
  const { role, isHydrating } = useRole()
  useEffect(() => {
    if (isHydrating) return

    const timeoutId = setTimeout(() => {
      if (role === ROLE_FARMER) {
        navigation.replace('FarmerApp')
        return
      }
      if (role === ROLE_EXPERT) {
        navigation.replace('ExpertApp')
        return
      }
      navigation.replace('Onbording')
    }, 1200)

    return () => clearTimeout(timeoutId)
  }, [navigation, role, isHydrating])

  return (

    <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.background} blurRadius={15}>
      <Image style={styles.LOGO} source={require('../../assets/Images/logo.png')} />
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