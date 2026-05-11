import { Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRole } from '../../context/RoleContext'
import { ROLE_EXPERT, ROLE_FARMER } from '../../constants/roles'
import { getStoredEmail } from '../../services/userStorage'

const SplashScreen = () => {
  const navigation = useNavigation()
  const { role, isHydrating, clearRole } = useRole()
  const hasNavigated = useRef(false)
  
  useEffect(() => {
    // Check if this is a fresh install or app restart with saved role
    // Don't clear role here - we want to preserve login state on app restart
  }, [])

  useEffect(() => {
    const openStoredSession = async (nextRoute) => {
      if (hasNavigated.current) return

      const storedEmail = await getStoredEmail()
      if (storedEmail) {
        hasNavigated.current = true
        navigation.replace(nextRoute)
        return
      }

      await clearRole()
      hasNavigated.current = true
      navigation.replace('Onbording')
    }

    const timeoutId = setTimeout(() => {
      if (hasNavigated.current) return
      
      // If user is already logged in (role + email exist), navigate to appropriate home
      if (role === ROLE_FARMER) {
        openStoredSession('FarmerApp')
        return
      }
      if (role === ROLE_EXPERT) {
        openStoredSession('ExpertApp')
        return
      }

      // If still hydrating, wait longer
      if (isHydrating) return

      // If no saved role, start from onboarding
      hasNavigated.current = true
      navigation.replace('Onbording')
    }, 1200)

    const hardFallbackId = setTimeout(async () => {
      if (hasNavigated.current) return
      // Fallback to onboarding if anything goes wrong
      if (!role) {
        hasNavigated.current = true
        navigation.replace('Onbording')
        return
      }

      const storedEmail = await getStoredEmail()
      hasNavigated.current = true
      if (!storedEmail) {
        await clearRole()
        navigation.replace('Onbording')
      } else if (role === ROLE_FARMER) {
        navigation.replace('FarmerApp')
      } else if (role === ROLE_EXPERT) {
        navigation.replace('ExpertApp')
      } else {
        navigation.replace('Onbording')
      }
    }, 3500)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(hardFallbackId)
    }
  }, [navigation, role, isHydrating, clearRole])

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
