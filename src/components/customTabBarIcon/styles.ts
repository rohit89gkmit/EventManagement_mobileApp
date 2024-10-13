import {StyleSheet} from 'react-native';

export const styles = (focused: boolean, index: number) =>
  StyleSheet.create({
    iconContainer: {
      height: 60,
      width: 60,
      backgroundColor: focused ? 'white' : 'black',
      borderRadius: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: index === 1 ? -22 : index === 4 ? 22 : 0,
    },
  });
