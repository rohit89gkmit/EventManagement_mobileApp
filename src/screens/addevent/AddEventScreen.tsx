import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import CustomTextInput from '@src/components/CustomTextInput';
const AddEventScreen = () => {
  const intialSignUpData = {
    title: '',
    date: new Date(),
    description: '',
    attendeeLimit: 0,
    location: '',
  };
  const [eventData, setEventData] =
    useState<eventFormDataType>(intialSignUpData);
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

        <CustomTextInput
          placeholder="Enter event location"
          secured={false}
          iconName="envelope"
          setData={setEventData}
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEventScreen;
