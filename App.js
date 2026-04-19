import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StackNavigation from './src/Navigation/StackNavigation'
import config from './src/config'

/*
  App entry: centralizes runtime config usage so keys come from `.env` via
  `react-native-config` and `src/config`. Professional apps keep a single
  config surface to make audits and changes simple.
*/

const App = () => {
  if (config.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('Loaded config:', { NODE_ENV: config.NODE_ENV })
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <StackNavigation />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  root: { flex: 1 },
})