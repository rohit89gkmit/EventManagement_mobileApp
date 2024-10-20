import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    height: 130,
    width: 320,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    display: 'flex',
    gap: 5,
    paddingHorizontal: 15,
  },
  headingText: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 22,
  },
  viewContainer: {
    maxWidth: 220,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  valueContainer: {
    width: 170,
    // backgroundColor: colors.gray,
    padding: 3,
    borderRadius: 5,
  },
  settings: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
