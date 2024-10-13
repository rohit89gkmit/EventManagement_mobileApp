import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './styles';
import AttendeeContainer from '@src/components/attendeeContainer';
const EventCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.headingText}>Meeting with Alice!</Text>

      <View style={styles.viewContainer}>
        <Entypo name="calendar" size={20} color="black" />
        <View style={styles.valueContainer}>
          <Text>Saturday 12 October</Text>
        </View>
      </View>

      <View style={styles.viewContainer}>
        <Feather name="clock" size={20} color="black" />
        <View style={styles.valueContainer}>
          <Text>10 : 40 AM</Text>
        </View>
      </View>

      <View style={styles.viewContainer}>
        <FontAwesome6 name="location-dot" size={20} color="black" />
        <View style={[styles.valueContainer, {marginLeft: 5}]}>
          <Text>Shobhagpura, Udaipur</Text>
        </View>
      </View>

      <View style={styles.viewContainer}>
        <Fontisto name="persons" size={20} color="black" />
        <AttendeeContainer attendeeCount={4} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
