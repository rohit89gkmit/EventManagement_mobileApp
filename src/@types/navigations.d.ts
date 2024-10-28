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
    EVENTLISTSTACKSCREEN: undefined;
    PROFILESTACKSCREEN: undefined;
  };

  type EventListStackParamList = {
    EVENTLIST: undefined;
    ADDEVENT: undefined;
    EVENTDETAILS: undefined;
  };

  type SettingStackParamList = {
    PROFILE: undefined;
    SETTING: undefined;
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
  type AddEventScreenProps = NativeStackScreenProps<
    EventListStackParamList,
    ROUTES.ADDEVENT
  >;
  type EventDetailScreenProps = NativeStackScreenProps<
    EventListStackParamList,
    ROUTES.EVENTDETAILS
  >;
  type EventListScreenProps = NativeStackScreenProps<
    EventListStackParamList,
    ROUTES.EVENTLIST
  >;
  type EventListStackScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.EVENTLISTSTACKSCREEN
  >;
  type ProfileStackScreenProps = BottomTabScreenProps<
    BottomTabParamList,
    ROUTES.PROFILESTACKSCREEN
  >;
  type SettingScreenProps = NativeStackScreenProps<
    SettingStackParamList,
    ROUTES.SETTING
  >;
  type ProfileScreenProps = NativeStackScreenProps<
    SettingStackParamList,
    ROUTES.PROFILE
  >;
}
