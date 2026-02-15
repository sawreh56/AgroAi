import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DirectAgro = () => {
  return (
    <View style={styles.container}>
      <Text>Direct Agro Screen</Text>
    </View>
  )
}

export default DirectAgro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})