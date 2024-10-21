import {Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useContext} from 'react';
import EventContext from '@src/context/EventContext';
import {styles} from './styles';

const ConfirmationModal = ({setConfirmStatus, message}: any) => {
  const {modalVisible, setModalVisible} = useContext(EventContext);

  const confirmLogout = () => {
    setModalVisible(false);
    setConfirmStatus('Yes');
  };
  const handleCancelClicked = () => {
    setModalVisible(false);
    setConfirmStatus('No');
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to {message}?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={confirmLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={handleCancelClicked}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationModal;
