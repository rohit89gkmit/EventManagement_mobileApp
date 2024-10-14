import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {nameRegex, limitRegex} from '@src/constants/constants';
import CustomTextInput from '@src/components/CustomTextInput';
const AddEventScreen = () => {
  const intialSignUpData = {
    title: '',
    date: new Date(),
    description: '',
    limit: 0,
    location: '',
  };
  const initialErrorObj = {
    title: '',
    limit: '',
    location: '',
  };
  const [eventData, setEventData] =
    useState<eventFormDataType>(intialSignUpData);

  const [error, setError] = useState(initialErrorObj);
  const validateFormData = () => {
    const data = {...eventData};
    const errorObj = initialErrorObj;
    let allTrue = true;
    if (!data.title) {
      errorObj.title = 'Title is required';
      allTrue = false;
    } else if (!nameRegex.test(data.title)) {
      errorObj.title = 'Title must contain only letters and spaces';
      allTrue = false;
    }
    if (!data.limit) {
      errorObj.limit = 'Limit is required';
      allTrue = false;
    } else if (data.limit < 0) {
      errorObj.limit = 'Limit must be a positive integer';
      allTrue = false;
    } else if (!limitRegex.test(String(data.limit))) {
      errorObj.limit = 'Limit must be between 2 and 100';
      allTrue = false;
    }
    if (!data.location) {
      errorObj.location = 'Location is required';
      allTrue = false;
    } else if (!nameRegex.test(data.location)) {
      errorObj.location = 'Location must contain only letters and spaces';
      allTrue = false;
    }
    setError(prevError => {
      return {...errorObj};
    });
    return allTrue;
  };

  const handleAddEventClicked = () => {
    const isValidateFormData = validateFormData();
  };
  return (
    <View style={styles.container}>
      <Text>AddEventScreen</Text>
      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Enter event title"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />
        {error.title !== '' && (
          <Text style={styles.errorTextMessage}>{error.title}</Text>
        )}

        <CustomTextInput
          placeholder="Enter event date"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />

        <CustomTextInput
          placeholder="Enter event description"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />

        <CustomTextInput
          placeholder="Enter attendee limit"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />
        {error.limit !== '' && (
          <Text style={styles.errorTextMessage}>{error.limit}</Text>
        )}

        <CustomTextInput
          placeholder="Enter event location"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />
        {error.location !== '' && (
          <Text style={styles.errorTextMessage}>{error.location}</Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleAddEventClicked}>
          <Text style={styles.loginText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEventScreen;
