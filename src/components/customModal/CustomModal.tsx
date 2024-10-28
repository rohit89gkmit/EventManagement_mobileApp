import {
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Modal} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import CustomTextInput from '../CustomTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import EventContext from '@src/context/EventContext';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {emailRegex, nameRegex} from '@src/constants/constants';
import useAsyncStorage from '@src/hooks/useAsyncStorage';
const CustomModal = () => {
  const {
    visible,
    addOrEditButton,
    attendeeData,
    attendeesList,
    addAttendee,
    setAttendeeData,
    setVisible,
  } = useContext(EventContext);

  const [error, setError] = useState({name: '', email: ''});

  const validateAttendeeData = () => {
    const data = {...attendeeData};
    const errorObj = error;
    let allTrue = true;
    if (!data.name) {
      errorObj.name = 'Name is required';
      allTrue = false;
    } else if (!nameRegex.test(data.name)) {
      errorObj.name = 'Name must contain only letters and spaces';
      allTrue = false;
    }
    if (!data.email) {
      errorObj.email = 'Email is required';
      allTrue = false;
    }
    if (data.email && !emailRegex.test(data.email)) {
      errorObj.email = 'Invalid Email format';
      allTrue = false;
    }

    setError(prevError => {
      return {...errorObj};
    });
    return allTrue;
  };

  const handleAddAttendeeClicked = () => {
    const isValidateAttendee = validateAttendeeData();
    if (isValidateAttendee) {
      addAttendee(attendeeData.email);
      setVisible(false);
      setError(prevError => {
        return {name: '', email: ''};
      });
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setError({name: '', email: ''});
  };

  const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              height: screenHeight / 2 - 120,
              width: screenWidth,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
          ]}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}>
            <Entypo name="cross" size={24} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.formContainer}>
            <CustomTextInput
              placeholder="Enter name"
              secured={false}
              iconName="account"
              setData={setAttendeeData}
              value={attendeeData.name}
            />
            {error.name !== '' && (
              <Text style={styles.errorTextMessage}>{error.name}</Text>
            )}

            <CustomTextInput
              placeholder="Enter email"
              secured={false}
              iconName="email-outline"
              setData={setAttendeeData}
              value={attendeeData.email}
            />
            {error.email !== '' && (
              <Text style={styles.errorTextMessage}>{error.email}</Text>
            )}

            <TouchableOpacity
              onPress={handleAddAttendeeClicked}
              style={styles.addButton}>
              <Text style={styles.buttonText}>
                {addOrEditButton === 'Add' ? 'Add attendee' : 'Save changes'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomModal;
