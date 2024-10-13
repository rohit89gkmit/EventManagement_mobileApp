import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    height: 300,
    width: 260,
    borderRadius: 20,
    marginLeft: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  headingText: {
    marginTop: 20,
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 800,
  },
  viewContainer: {
    maxWidth: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  valueContainer: {
    width: 180,
    backgroundColor: colors.gray,
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    width: 120,
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
