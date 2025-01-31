import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
import {fonts} from '@src/resources/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
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
    marginTop: 12,
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginTop: 25,
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
    fontSize: 14,
    fontFamily: fonts.Bold,
  },
  errorTextMessage: {
    color: 'red',
    marginLeft: 17,
    marginTop: -10,
  },
  genderContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 5,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginVertical: 5,
  },
  genderText: {
    marginLeft: 20,
    fontSize: 16,
  },
});
