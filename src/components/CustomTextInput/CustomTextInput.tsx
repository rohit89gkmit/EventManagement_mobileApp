import {TextInput, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@src/resources/colors';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const CustomTextInput = ({
  placeholder,
  secured,
  iconName,
  setData,
  value,
}: customTextInputProps) => {
  const [secureEntery, setSecureEntery] = useState<boolean>(true);

  const getNameOfInputField = (str: string) => {
    let i = str.length - 1;
    while (str[i] != ' ') i--;
    return str.slice(i + 1);
  };
  let name = getNameOfInputField(placeholder);

  const handleFormChange = (text: string) => {
    if (placeholder === 'Confirm password') name = 'confirmpassword';
    setData(
      (
        prevData:
          | loginFormDataType
          | signUpFormDataType
          | eventFormDataType
          | attendeeFormType,
      ) => {
        return {...prevData, [name]: text};
      },
    );
  };
  let capitalizedName = name[0].toUpperCase() + name.slice(1);
  if (placeholder === 'Confirm password') capitalizedName = 'Confirm Password';

  return (
    <View>
      <Text style={styles.label}>{capitalizedName}</Text>
      <View style={styles.inputContainer}>
        {iconName !== '' && (
          <MaterialCommunityIcons
            name={iconName}
            size={22}
            color={colors.secondary}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.secondary}
          secureTextEntry={secured && secureEntery}
          onChangeText={handleFormChange}
          value={value as string}
        />
        {secured && (
          <TouchableOpacity
            onPress={() => {
              setSecureEntery(prev => !prev);
            }}>
            {!secureEntery ? (
              <SimpleLineIcons
                name={'eye'}
                size={20}
                color={colors.secondary}
              />
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
    </View>
  );
};

export default CustomTextInput;
