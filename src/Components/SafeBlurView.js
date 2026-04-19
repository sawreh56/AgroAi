import React from 'react'
import { Platform, View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

/**
 * Android devices commonly render `BlurView` as a black surface (or fail to
 * composite correctly) when used as an absolute-fill overlay. To keep the UI
 * stable, we fall back to a simple translucent layer on Android.
 */
export default function SafeBlurView({
  style,
  fallbackColor = 'rgba(0,0,0,0.35)',
  blurType = 'dark',
  blurAmount = 10,
  reducedTransparencyFallbackColor = 'black',
  ...rest
}) {
  if (Platform.OS === 'android') {
    return <View style={[style, { backgroundColor: fallbackColor }]} {...rest} />
  }

  return (
    <BlurView
      style={style}
      blurType={blurType}
      blurAmount={blurAmount}
      reducedTransparencyFallbackColor={reducedTransparencyFallbackColor}
      {...rest}
    />
  )
}

