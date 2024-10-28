import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@src/constants/routes';
import {colors} from '@src/resources/colors';
import {ProfileScreen, SettingScreen} from '@src/screens';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '@src/screens/profile/styles';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useEffect} from 'react';

const Stack = createStackNavigator<SettingStackParamList>();

const ProfileStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();
  const route = useRoute<RouteProp<SettingStackParamList>>();

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        options={{
          headerTitle: 'Profile',
          headerTitleStyle: {fontSize: 20},
          headerRight: () => (
            <TouchableOpacity
              style={styles.settings}
              onPress={() => navigation.navigate(ROUTES.SETTING)}>
              <Ionicons
                name="settings-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {marginBottom: 20, paddingRight: 25},
        }}
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Settings',
          headerTitleStyle: {fontSize: 20},
          headerLeftLabelVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate(ROUTES.PROFILE)}>
              <Ionicons
                name={'arrow-back-outline'}
                color={colors.primary}
                size={25}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 10,
            marginBottom: 10,
            paddingVertical: 20,
          },
        }}
        name={ROUTES.SETTING}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
