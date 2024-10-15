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
  errorTextMessage: {
    color: 'red',
    marginLeft: 12,
  },
  addAttendeesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
    marginLeft: 15,
  },
  attendeesText: {fontSize: 18},
});
