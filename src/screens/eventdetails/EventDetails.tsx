import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AttendeesList from '@src/components/attendeesList';
import {useNavigation, useRoute} from '@react-navigation/native';
import ConfirmationModal from '@src/components/confirmationmodal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventContext from '@src/context/EventContext';
import {ROUTES} from '@src/constants/routes';
const EventDetails = () => {
  const route = useRoute();
  const {navigate} = useNavigation();
  const event = route.params || {};
  console.log(event);

  const {setModalVisible, removeEventFromList, editEventFromList} =
    useContext(EventContext);

  const [confirmStatus, setConfirmStatus] = useState<string>('');

  const handleDeleteEventClicked = () => {
    setModalVisible(true);
  };
  const handleEditEventClicked = () => {
    editEventFromList(event?.id);
    navigate(ROUTES.ADDEVENT);
  };

  useEffect(() => {
    if (confirmStatus === 'Yes') {
      console.log('eventdeleted with id', event?.id);
      removeEventFromList(event?.id);
      setConfirmStatus('No');
      navigate(ROUTES.EVENTLIST);
    }
  }, [confirmStatus]);

  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <View
        style={{
          width: 350,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
            paddingBottom: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {event?.title}
          </Text>
        </View>

        {/* <Text style={{}} /> */}

        <View style={styles.contend}>
          <Entypo name="calendar" size={20} />
          <Text style={styles.text}>January 26, 2024</Text>
        </View>

        <View style={styles.contend}>
          <FontAwesome6 name="location-dot" size={20} />
          <Text style={styles.text}>The think tank</Text>
        </View>

        <View style={styles.contend}>
          <FontAwesome6 name="clock" size={18} />
          <Text style={styles.text}>6:43</Text>
        </View>

        {event?.description !== '' && (
          <View style={{flexDirection: 'row', gap: 10, marginTop: 7}}>
            <MaterialIcons name="description" size={22} />
            <Text style={{width: 280, fontSize: 15}}>{event?.description}</Text>
          </View>
        )}

        <View style={styles.contend}>
          <Fontisto name="persons" size={18} />
          <Text style={styles.text}>{event?.attendees?.length}</Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          marginTop: 30,
          marginRight: 250,
          marginBottom: 4,
        }}>
        Attendees:
      </Text>
      <ScrollView
        style={{
          width: 350,
          height: 300,
          gap: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 10,
          display: 'flex',
          //   marginTop: 30,
        }}>
        {event?.attendees.map(({name, email}) => {
          return (
            <View
              key={`${name}+${email}`}
              style={{
                width: 325,
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                flexDirection: 'row',
                borderRadius: 10,
                justifyContent: 'space-around',
                marginTop: 8,
              }}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <MaterialCommunityIcons name="account" size={20} />
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{width: 80}}>
                  {name}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <MaterialCommunityIcons name="email" size={20} />
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{width: 105}}>
                  {email}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: 350,
          justifyContent: 'space-between',
          marginTop: 60,
        }}>
        <TouchableOpacity
          onPress={handleEditEventClicked}
          style={{
            width: 150,
            backgroundColor: 'black',
            borderRadius: 10,
            padding: 8,
            paddingVertical: 12,
          }}>
          <Text
            style={{color: 'white', fontWeight: '500', textAlign: 'center'}}>
            Edit Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteEventClicked}
          style={{
            width: 150,
            backgroundColor: 'red',
            borderRadius: 10,
            padding: 8,
            paddingVertical: 12,
          }}>
          <Text
            style={{color: 'white', fontWeight: '500', textAlign: 'center'}}>
            Delete Event
          </Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        setConfirmStatus={setConfirmStatus}
        message="remove this event"
      />
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  contend: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 9,
  },
  text: {
    fontSize: 16,
  },
});
