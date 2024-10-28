import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@src/constants/routes';
import {AddEventScreen, EventDetails, EventListScreen} from '@src/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {styles} from '@src/screens/profile/styles';
import {useEffect} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import {colors} from '@src/resources/colors';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator<EventListStackParamList>();
const EventListStackNavigator = ({
  navigation,
  route,
}: EventListStackScreenProps) => {
  // const navigation = useNavigation<NavigationProp<>>();
  // const route = useRoute<RouteProp<EventListStackScreenProps>>();

  useEffect(() => {
    console.warn('Current Route: ', route);
  }, [route]);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.EVENTLIST;
    navigation.setOptions({
      tabBarStyle:
        routeName === ROUTES.EVENTLIST
          ? {
              position: 'absolute',
              bottom: 27,
              left: 35,
              right: 35,
              backgroundColor: 'black',
              borderRadius: 32,
              height: 64,
              paddingBottom: 4,
              paddingTop: 4,
            }
          : {
              display: 'none',
            },
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Eventlist',
          headerTitleStyle: {fontSize: 20},
        }}
        name={ROUTES.EVENTLIST}
        component={EventListScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Add Event',
          headerTitleStyle: {fontSize: 20},
          headerLeftLabelVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={navigation.goBack}>
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
        name={ROUTES.ADDEVENT}
        component={AddEventScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Event Details',
          headerTitleStyle: {fontSize: 20},
          headerLeftLabelVisible: false,
          headerLeft: ({}) => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
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
        name={ROUTES.EVENTDETAILS}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};

export default EventListStackNavigator;
