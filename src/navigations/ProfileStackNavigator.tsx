import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@src/constants/routes';
import {ProfileScreen, SettingScreen} from '@src/screens';
const Stack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen
        options={{headerShown: true}}
        name={ROUTES.SETTING}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
