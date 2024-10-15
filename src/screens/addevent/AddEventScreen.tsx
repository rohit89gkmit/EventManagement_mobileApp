import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {styles} from './styles';
import CustomTextInput from '@src/components/CustomTextInput';
import EventContext from '@src/context/EventContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomModal from '@src/components/customModal';
import AttendeesList from '@src/components/attendeesList';
const AddEventScreen = () => {
  const {
    error,
    attendeesList,
    disabled,
    setEventData,
    addEvent,
    setVisible,
    setAttendeeData,
    setAddOrEditButton,
    resetEventContext,
  } = useContext(EventContext);

  const handleAddAttendeeClicked = () => {
    setAttendeeData(() => {
      return {name: '', email: ''};
    });
    setAddOrEditButton('Add');
    if (!disabled) setVisible(true);
  };
  useEffect(() => {
    resetEventContext();

    return () => {
      resetEventContext();
    };
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <CustomTextInput
          placeholder="Enter event title"
          secured={false}
          iconName=""
          setData={setEventData}
        />
        {error.title !== '' && (
          <Text style={styles.errorTextMessage}>{error.title}</Text>
        )}

        <CustomTextInput
          placeholder="Enter event date"
          secured={false}
          iconName=""
          setData={setEventData}
        />
        <CustomTextInput
          placeholder="Enter event description"
          secured={false}
          iconName=""
          setData={setEventData}
        />

        <CustomTextInput
          placeholder="Enter attendee limit"
          secured={false}
          iconName=""
          setData={setEventData}
        />
        {error.limit !== '' && (
          <Text style={styles.errorTextMessage}>{error.limit}</Text>
        )}

        <CustomTextInput
          placeholder="Enter event location"
          secured={false}
          iconName=""
          setData={setEventData}
        />
        {error.location !== '' && (
          <Text style={styles.errorTextMessage}>{error.location}</Text>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={addEvent}>
          <Text style={styles.loginText}>Add Event</Text>
        </TouchableOpacity>

        <View style={styles.addAttendeesContainer}>
          <Text style={styles.attendeesText}>Attendees:</Text>
          <TouchableOpacity onPress={handleAddAttendeeClicked}>
            <AntDesign
              name="pluscircleo"
              size={30}
              color={disabled ? 'red' : 'green'}
            />
          </TouchableOpacity>
        </View>
        <Text>{attendeesList?.length}</Text>
        {attendeesList.length > 0 && <AttendeesList />}
        <CustomModal />
      </View>
    </ScrollView>
  );
};

export default AddEventScreen;
