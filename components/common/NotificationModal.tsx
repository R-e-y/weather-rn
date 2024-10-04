import React from 'react';

import {StyleSheet, Modal, View, Text, Pressable, Button} from 'react-native';
import {Notification} from '../../types/Notification';

interface NotificationModalProps {
  notification: Notification;
  modalVisible: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  notification,
  ...props
}: NotificationModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onClose}>
      {/* <View style={styles.centeredView}> */}
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{notification.title}</Text>
        <Text style={styles.modalText}>{notification.body}</Text>
        <Button onPress={props.onClose} title="Cancel" />
      </View>
      {/* </View> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    // width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
