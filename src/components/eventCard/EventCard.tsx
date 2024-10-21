import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './styles';
import {colors} from '@src/resources/colors';
import EventContext from '@src/context/EventContext';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@src/constants/routes';

const EventCard = ({
  title,
  location,
  id,
  attendees,
  confirmStatus,
  date,
  setConfirmStatus,
}: eventCardProps) => {
  const {editEventFromList, removeEventFromList, setModalVisible} =
    useContext(EventContext);

  const {navigate} = useNavigation();
  const handleEditEventClicked = () => {
    editEventFromList(id);
    navigate(ROUTES.ADDEVENT);
  };

  const handleDeleteEventClicked = () => {
    setModalVisible(true);
  };

  function formatDateString(dateString: any) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);

    // Format the date
    return date
      .toLocaleDateString('en-US', options)
      .replace(', ', ' ')
      .replace(/\d+/, match => match.trim());
  }
  const newDate = formatDateString(date);

  useEffect(() => {
    if (confirmStatus === 'Yes') {
      console.log('eventdeleted with id', id);
      removeEventFromList(id);
      setConfirmStatus('No');
    }
  }, [confirmStatus]);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.headingText}>{title}</Text>

      <View style={{flexDirection: 'row', gap: 50}}>
        <View style={{gap: 5}}>
          <View style={styles.viewContainer}>
            <Entypo name="calendar" size={16} color="black" />
            <View style={[styles.valueContainer, {marginLeft: 3}]}>
              <Text>{newDate}</Text>
            </View>
          </View>

          <View style={styles.viewContainer}>
            <FontAwesome6 name="location-dot" size={16} color="black" />
            <View style={[styles.valueContainer, {marginLeft: 5}]}>
              <Text>{location}</Text>
            </View>
          </View>

          <View style={styles.viewContainer}>
            <Fontisto name="persons" size={16} color="black" />
            <View style={[styles.valueContainer, {marginLeft: 0}]}>
              <Text>{attendees.length}</Text>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', gap: 0, marginTop: -35}}>
          <TouchableOpacity
            onPress={handleEditEventClicked}
            style={styles.settings}>
            <Feather name="edit" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteEventClicked}
            style={styles.settings}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default EventCard;
