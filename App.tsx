import { SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from '@src/navigations/AuthNavigator'
const App = () => {
  return (
    <SafeAreaView style={styles.navigationContainer}>
      <NavigationContainer>
        <AuthNavigator/>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  navigationContainer:{
    flex:1
  }
})
