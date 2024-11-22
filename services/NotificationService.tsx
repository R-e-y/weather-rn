import {useEffect, useState} from 'react';
import NotificationModal from '../components/common/NotificationModal';
import usePushNotifications from '../hooks/usePushNotification';

export default function NotificationService() {
  const notification = usePushNotifications();
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (notification) {
      setModalVisible(true);
    }
  }, [notification]);

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    notification ? (
      <NotificationModal
        notification={notification}
        modalVisible={modalVisible}
        onClose={handleCloseModal}
      />
    )
    : null
  );
}
