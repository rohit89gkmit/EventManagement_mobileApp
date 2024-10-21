import {TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '@src/resources/colors';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type props = {
  route?: string
}
const CustomBackButton = ({route}:props) => {
  const navigation = useNavigation();

  const handleOnPress = ()=>{
    if(route) navigation.navigate(route)
  }
  return (
    <TouchableOpacity style={styles.backButton} onPress={handleOnPress}>
      <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;


