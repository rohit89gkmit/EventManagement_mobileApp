import {StyleSheet} from 'react-native';
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
});
