import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ROUTES} from '@src/constants/routes';
import {DashBoardScreen} from '@src/screens';
import CustomTabBarIcon from '@src/components/customTabBarIcon';
import EventListStackNavigator from './EventListStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 27,
          left: 35,
          right: 35,
          backgroundColor: 'black',
          borderRadius: 32,
          height: 64,
          paddingBottom: 4,
          paddingTop: 4,
        },
      }}>
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashBoardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} iconName="home" index={1} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.EVENTLISTSTACKSCREEN}
        component={EventListStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} iconName="apps" index={3} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILESTACKSCREEN}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              focused={focused}
              iconName="person-fill"
              index={4}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
