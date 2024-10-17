import {Text, View, TouchableOpacity, ScrollView, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {styles} from './styles';
import CustomTextInput from '@src/components/CustomTextInput';
import EventContext from '@src/context/EventContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomModal from '@src/components/customModal';
import AttendeesList from '@src/components/attendeesList';
import {colors} from '@src/resources/colors';
const AddEventScreen = () => {
  const {
    error,
    attendeesList,
    disabled,
    eventData,
    date,
    setEventData,
    addEvent,
    setVisible,
    setAttendeeData,
    setAddOrEditButton,
    resetEventContext,
    setDate,
  } = useContext(EventContext);

  const [open, setOpen] = useState(false);

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

        <Text style={{marginLeft: 20, fontSize: 16, marginBottom: 5}}>
          Date
        </Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 50,
            padding: 12,
            marginBottom: 10,
          }}>
          <Text style={{marginLeft: 15, color: 'black'}}>{`${date}`}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
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

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => addEvent(eventData.title)}>
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
        <Text>Number of Attendees added {attendeesList?.length}</Text>
        {attendeesList.length > 0 && <AttendeesList />}
        <CustomModal />
      </View>
    </ScrollView>
  );
};

export default AddEventScreen;
