import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = StyleSheet.create({
  valueField: {
    width: 370,
    backgroundColor: colors.gray,
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  switchView: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonView: {
    width: 370,
    borderRadius: 15,
    paddingVertical: 15,
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
