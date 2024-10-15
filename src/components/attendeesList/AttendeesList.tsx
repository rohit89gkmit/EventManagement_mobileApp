import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import EventContext from '@src/context/EventContext';
import AttendeeCard from '@src/components/attendeeCard';

const AttendeesList = () => {
  const {attendeesList} = useContext(EventContext);
  return (
    <View>
      <FlatList
        data={attendeesList}
        renderItem={({item}) => (
          <AttendeeCard email={item.email} name={item.name} />
        )}
      />
    </View>
  );
};

export default AttendeesList;

const styles = StyleSheet.create({});
