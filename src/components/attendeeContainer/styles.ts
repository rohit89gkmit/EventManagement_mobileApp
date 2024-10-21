import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = StyleSheet.create({
  imageView: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    marginRight: 22,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  attendeeCount: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
