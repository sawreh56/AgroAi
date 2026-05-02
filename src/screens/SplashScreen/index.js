import { Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRole } from '../../context/RoleContext'
import { ROLE_EXPERT, ROLE_FARMER } from '../../constants/roles'

const SplashScreen = () => {
  const navigation = useNavigation()
  const { role, isHydrating } = useRole()
  const hasNavigated = useRef(false)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasNavigated.current) return
      if (role === ROLE_FARMER) {
        hasNavigated.current = true
        navigation.replace('FarmerApp')
        return
      }
      if (role === ROLE_EXPERT) {
        hasNavigated.current = true
        navigation.replace('ExpertApp')
        return
      }

      // If we still don't have a role (or hydration is slow), continue to onboarding
      // so the app never gets stuck on splash.
      if (isHydrating) return

      hasNavigated.current = true
      navigation.replace('Onbording')
    }, 1200)

    const hardFallbackId = setTimeout(() => {
      if (hasNavigated.current) return
      hasNavigated.current = true
      navigation.replace('Onbording')
    }, 3500)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(hardFallbackId)
    }
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