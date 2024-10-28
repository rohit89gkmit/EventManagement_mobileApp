import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import EventContext from '@src/context/EventContext';
import {styles} from './styles';
const AttendeeCard = ({name, email}: attendeeCardProps) => {
  const {removeAttendeeFromList, editAttendeeFromList, setdisabled} =
    useContext(EventContext);

  const handleRemoveButtonClicked = () => {
    setdisabled(false);
    removeAttendeeFromList(email);
  };
  const handleEditAttendeeClicked = () => {
    editAttendeeFromList(email);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerView}>
        <View style={{flexDirection: 'col', gap: 2}}>
          <Text>{name}</Text>
          <Text>{email}</Text>
        </View>
        <View style={styles.editRemoveContainer}>
          <TouchableOpacity onPress={handleEditAttendeeClicked}>
            <FontAwesome name="edit" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveButtonClicked}>
            <Entypo name="circle-with-cross" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AttendeeCard;
