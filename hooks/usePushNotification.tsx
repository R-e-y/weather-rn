import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import NotificationModal from '../components/common/NotificationModal';
import {Notification} from '../types/Notification';

export default function usePushNotification() {
  const [notification, setNotification] = useState<Notification>();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (remoteMessage.notification)
        setNotification({
          title: remoteMessage.notification.title || 'New Notification',
          body:
            remoteMessage.notification.body || 'You have a new notification.',
        });

      console.log(JSON.stringify(remoteMessage), 'ooooooooo');
    });

    return unsubscribe;
  }, []);

  return notification;
}
