import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
import {fonts} from '@src/resources/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: colors.primary,
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
  errorTextMessage: {
    color: 'red',
    marginLeft: 12,
  },
});
