import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@src/constants/routes';
import {AddEventScreen, EventListScreen} from '@src/screens';

const Stack = createStackNavigator();
const EventListStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.EVENTLIST} component={EventListScreen} />
      <Stack.Screen
        options={{headerShown: true}}
        name={ROUTES.ADDEVENT}
        component={AddEventScreen}
      />
    </Stack.Navigator>
  );
};

export default EventListStackNavigator;
