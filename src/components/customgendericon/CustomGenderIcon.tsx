import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';
const CustomGenderIcon = ({name, gender, setGender}: customGenderIconProps) => {
  let newName = name[0].toLocaleUpperCase() + name.slice(1);
  if (name === 'male-female') newName = 'others';
  const dynamicStyles = styles(name, gender, newName);

  const handleOnPressClicked = () => {
    setGender(newName);
  };
  return (
    <TouchableOpacity
      style={dynamicStyles.genderContainer}
      onPress={handleOnPressClicked}>
      <MaterialCommunityIcons name={`gender-${name}`} size={20} />
      <Text>{newName}</Text>
    </TouchableOpacity>
  );
};

export default CustomGenderIcon;
