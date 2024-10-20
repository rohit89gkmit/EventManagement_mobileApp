import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
import {fonts} from '@src/resources/fonts';
export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#dad7cd',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    marginVertical: 5,
    marginBottom: 12,
  },
  addButton: {
    marginTop: 20,
    width: 325,
    backgroundColor: 'black',
    borderRadius: 100,
    paddingHorizontal: 20,
    padding: 14,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorTextMessage: {
    color: 'red',
    marginLeft: 12,
  },
});
