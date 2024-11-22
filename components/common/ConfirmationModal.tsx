import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  modalVisible: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  modalVisible,
  title,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // only for android
      onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCancel}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={onConfirm}>
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonDelete: {
    backgroundColor: '#ff4444',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
