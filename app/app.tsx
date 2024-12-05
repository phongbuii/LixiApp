import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppNavigator } from './navigators/AppNavigator'
import { useNavigationPersistence } from './navigators'
import * as storage from "./utils/storage"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
const App = () => {
    const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})