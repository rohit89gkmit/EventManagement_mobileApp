import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignUpScreen, DashBoardScreen} from '@src/screens';
import {ROUTES} from '@src/constants/routes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashBoardScreen}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
