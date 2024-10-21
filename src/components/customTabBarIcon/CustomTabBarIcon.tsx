import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Octicons from 'react-native-vector-icons/Octicons';

const CustomTabBarIcon = ({
  focused,
  iconName,
  index,
}: customTabBarIconProps) => {
  const dynamicStyles = styles(focused, index);
  return (
    <View style={dynamicStyles.iconContainer}>
      <Octicons name={iconName} size={20} color={focused ? 'black' : 'white'} />
    </View>
  );
};

export default CustomTabBarIcon;
