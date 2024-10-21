import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 12,
  },
  containerView: {
    width: 370,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editRemoveContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
