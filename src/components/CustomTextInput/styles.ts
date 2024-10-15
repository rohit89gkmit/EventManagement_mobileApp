import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
import {fonts} from '@src/resources/fonts';

export const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    marginBottom: 18,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
});
