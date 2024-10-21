import {TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '@src/resources/colors';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
const SearchBar = ({onChange}: searchBarProps) => {
  return (
    <View style={styles.searchBarView}>
      <Feather name="search" size={20} color={colors.secondary} />
      <TextInput
        style={{width: 270}}
        onChangeText={text => onChange(text)}
        placeholder="Search..."
      />
    </View>
  );
};

export default SearchBar;
