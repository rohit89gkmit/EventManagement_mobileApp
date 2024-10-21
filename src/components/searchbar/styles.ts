import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = StyleSheet.create({
  searchBarView: {
    marginTop: 20,
    width: 330,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});
