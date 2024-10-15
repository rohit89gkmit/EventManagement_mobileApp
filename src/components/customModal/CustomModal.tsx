import {Button, Text, Dimensions, TouchableOpacity, View} from 'react-native';
import {Modal} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomTextInput from '../CustomTextInput';
import EventContext from '@src/context/EventContext';
import {styles} from './styles';
import {emailRegex, nameRegex} from '@src/constants/constants';

const CustomModal = () => {
  const {
    visible,
    addOrEditButton,
    attendeeData,
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
    setError(prevError => {
      return {name: '', email: ''};
    });
    const isValidateAttendee = validateAttendeeData();
    if (isValidateAttendee) {
      addAttendee(attendeeData.email);
      setVisible(false);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setError({name: '', email: ''});
  };

  const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {height: screenHeight / 2 - 80, width: screenWidth},
          ]}>
          <Button title="close modal" onPress={handleCloseModal} />

          <View style={styles.formContainer}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
