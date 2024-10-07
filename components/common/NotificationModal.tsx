import React, {useEffect} from 'react';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [props.modalVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onClose}>
      <Pressable onPress={props.onClose}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{notification.title}</Text>
          <Text style={styles.modalBody}>{notification.body}</Text>
        </View>
      </Pressable>
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
    minHeight: 100,
    maxHeight: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'flex-start',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },

  modalBody: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '400',
  },
});
