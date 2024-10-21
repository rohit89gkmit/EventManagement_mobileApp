import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from '@src/navigations/AuthNavigator';
import {EventProvider} from '@src/context/EventContext';
const App = () => {
  return (
    <SafeAreaView style={styles.navigationContainer}>
      <EventProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </EventProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});
