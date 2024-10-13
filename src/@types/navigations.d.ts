import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ROUTES} from '@src/constants/routes';
declare global {
  type AuthStackParamList = {
    LOGIN: undefined;
    SIGNUP: undefined;
    MAIN: undefined;
  };

  type BottomTabParamList = {
    DASHBOARD: undefined;
    ADDEVENT: undefined;
    EVENTLIST: undefined;
    PROFILE: undefined;
  };

  type LoginScreenProps = NativeStackScreenProps<
    AuthStackParamList,
    ROUTES.LOGIN
  >;
  type SignUpScreenProps = NativeStackScreenProps<
    AuthtStackParamList,
    ROUTES.SIGNUP
  >;
  type MainScreenProps = NativeStackScreenProps<
    AuthtStackParamList,
    ROUTES.MAIN
  >;

  type DashBoardScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.DASHBOARD
  >;
  type AddEventScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.ADDEVENT
  >;
  type EventListScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.EVENTLIST
  >;
  type ProfileScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.PROFILE
  >;
}
