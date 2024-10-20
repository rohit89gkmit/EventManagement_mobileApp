import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = StyleSheet.create({
  container: {display: 'flex', alignItems: 'center'},
  profileText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
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
  profileSetting: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 130,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  nameText: {fontSize: 20, fontWeight: '600', marginTop: 10, marginBottom: 10},
  detailsContainer: {
    width: 350,
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconName: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  text: {fontWeight: '500'},
});
