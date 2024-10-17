import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import EventContext from '@src/context/EventContext';
import EventCard from '@src/components/eventCard';
import {ROUTES} from '@src/constants/routes';
const EventListscreen = ({navigation}: EventListScreenProps) => {
  const {eventList} = useContext(EventContext);
  return (
    <View>
      <FlatList
        data={eventList}
        renderItem={({item}) => (
          <EventCard
            title={item.title}
            limit={item.limit}
            location={item.location}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.ADDEVENT)}
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'black',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 320,
          marginLeft: 330,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventListscreen;

const styles = StyleSheet.create({});
