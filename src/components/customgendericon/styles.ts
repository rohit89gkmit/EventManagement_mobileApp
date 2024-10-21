import {StyleSheet} from 'react-native';
import {colors} from '@src/resources/colors';
export const styles = (name: string, gender: string, newName: string) =>
  StyleSheet.create({
    genderContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: gender === newName ? colors.gray : 'white',
      width: 80,
      padding: 1,
      borderRadius: 40,
    },
  });
