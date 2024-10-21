import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import EventContext from '@src/context/EventContext';
import {styles} from './styles';
const AttendeeCard = ({name, email}: attendeeCardProps) => {
  const {removeAttendeeFromList, editAttendeeFromList} =
    useContext(EventContext);

  const handleRemoveButtonClicked = () => {
    removeAttendeeFromList(email);
  };
  const handleEditAttendeeClicked = () => {
    editAttendeeFromList(email);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerView}>
        <Text>{name}</Text>
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
