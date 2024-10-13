import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROUTES } from "@src/constants/routes";
declare global{
    type AuthStackParamList = {
        LOGIN: undefined;
        SIGNUP: undefined;
        DASHBOARD: undefined;
    }

    type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, ROUTES.LOGIN>;
    type SignUpScreenProps = NativeStackScreenProps<AuthtStackParamList, ROUTES.SIGNUP>;
    type DashBoardScreenProps = NativeStackScreenProps<AuthtStackParamList, ROUTES.DASHBOARD>;

}