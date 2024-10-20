import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignUpScreen} from '@src/screens';
import {ROUTES} from '@src/constants/routes';
import TabNavigator from './TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkStorageKey = async () => {
      const currentStorageKey = await AsyncStorage.getItem('currentStorageKey');
      console.log(currentStorageKey);
      if (currentStorageKey) {
        setInitialRoute('Main');
      } else {
        setInitialRoute('Login');
      }
    };
    checkStorageKey();
  }, []);
  if (initialRoute === null) return null;
  return (
    <Stack.Navigator
      initialRouteName={initialRoute === 'Main' ? ROUTES.MAIN : ROUTES.LOGIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.MAIN} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
