import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EventCard from '@src/components/eventCard';

const EventListScreen = () => {
  return (
    <View>
      <Text>EventListScreen</Text>
      <EventCard />
    </View>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({});
