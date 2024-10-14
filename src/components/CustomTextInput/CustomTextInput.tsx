import {TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@src/resources/colors';
import {styles} from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextInput = ({
  placeholder,
  secured,
  iconName,
  setData,
}: customTextInputProps) => {
  const [secureEntery, setSecureEntery] = useState<boolean>(true);

  const getNameOfInputField = (str: string) => {
    let i = str.length - 1;
    while (str[i] != ' ') i--;
    return str.slice(i + 1);
  };

  const handleFormChange = (text: string) => {
    const name = getNameOfInputField(placeholder);
    setData(
      (
        prevData: loginFormDataType | signUpFormDataType | eventFormDataType,
      ) => {
        return {...prevData, [name]: text};
      },
    );
  };

  return (
    <View style={styles.inputContainer}>
      <SimpleLineIcons name={iconName} size={22} color={colors.secondary} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary}
        secureTextEntry={secured && secureEntery}
        onChangeText={handleFormChange}
      />
      {secured && (
        <TouchableOpacity
          onPress={() => {
            setSecureEntery(prev => !prev);
          }}>
          {!secureEntery ? (
            <SimpleLineIcons name={'eye'} size={20} color={colors.secondary} />
          ) : (
            <Ionicons
              name={'eye-off-outline'}
              size={20}
              color={colors.secondary}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
