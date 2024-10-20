import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@src/resources/colors';
import Feather from 'react-native-vector-icons/Feather';
const SearchBar = ({onChange}: searchBarProps) => {
  return (
    <View
      style={{
        marginTop: 20,
        width: 330,
        borderWidth: 1,
        borderColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
      }}>
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

const styles = StyleSheet.create({});
