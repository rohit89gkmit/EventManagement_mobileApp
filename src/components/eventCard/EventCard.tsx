import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './styles';
import AttendeeContainer from '@src/components/attendeeContainer';
import EventContext from '@src/context/EventContext';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@src/constants/routes';

const EventCard = ({title, limit, location}: eventCardProps) => {
  const {eventData, editEventFromList} = useContext(EventContext);

  const {navigate} = useNavigation();
  const handleEditEventClicked = () => {
    navigate(ROUTES.ADDEVENT);
    editEventFromList(eventData.title);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.headingText}>{title}</Text>

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
          <Text>{location}</Text>
        </View>
      </View>

      <View style={styles.viewContainer}>
        <Fontisto name="persons" size={20} color="black" />
        <AttendeeContainer attendeeCount={limit} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditEventClicked}>
        <Text style={styles.buttonText}>Edit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
