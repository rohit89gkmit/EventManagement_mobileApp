import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import EventContext from '@src/context/EventContext';
import AttendeeCard from '@src/components/attendeeCard';

const AttendeesList = () => {
  const {attendeesList} = useContext(EventContext);
  console.log('attendee list in attwnddeeList screen is', attendeesList);
  return (
    <View>
      {attendeesList.map(item => {
        return (
          <AttendeeCard key={item.email} email={item.email} name={item.name} />
        );
      })}
    </View>
  );
};

export default AttendeesList;

const styles = StyleSheet.create({});
