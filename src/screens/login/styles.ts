import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
import {fonts} from '@src/resources/fonts';
export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 60,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
    padding: 4,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: 'black',
    fontFamily: fonts.Bold,
  },
  errorTextMessage: {
    color: 'red',
    marginLeft: 12,
  },
});
