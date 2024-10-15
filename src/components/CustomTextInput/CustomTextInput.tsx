import {TextInput, TouchableOpacity, Text, View} from 'react-native';
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
  let name = getNameOfInputField(placeholder);

  const handleFormChange = (text: string) => {
    if (placeholder === 'Confirm password') name = 'confirmpassword';
    setData(
      (
        prevData: loginFormDataType | signUpFormDataType | eventFormDataType,
      ) => {
        return {...prevData, [name]: text};
      },
    );
  };
  let capitalizedName = name[0].toUpperCase() + name.slice(1);
  if (placeholder === 'Confirm password') capitalizedName = 'Confirm Password';

  return (
    <View>
      <Text style={{marginLeft: 30, fontSize: 16}}>{capitalizedName}</Text>
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
