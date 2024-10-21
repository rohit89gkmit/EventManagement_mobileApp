import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
  },
  loaderConatiner: {
    marginTop: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 660,
    left: 330,
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
  filterSortView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    marginTop: 15,
    marginBottom: 15,
  },
  eventHeading: {fontSize: 20, fontWeight: '500', marginTop: 10},
  filterView: {
    width: 130,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
  },
  sortView: {
    width: 160,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
  },
  sortFilterText: {fontSize: 16, fontWeight: '400', marginLeft: 13},
});
