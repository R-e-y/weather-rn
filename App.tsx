import React, { useEffect, useState } from 'react';
import {Alert, PermissionsAndroid, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import usePushNotifications from './hooks/usePushNotification';
import NotificationService from './services/NotificationService';
import { Notification } from './types/Notification';
import usePushNotification from './hooks/usePushNotification';
import AppNavigator from './navigation/AppNavigator';

declare global {
  var apiKey: string;
}
globalThis.apiKey = '16f82f59dec74ab3be8140412241809';

// // This is the type that defines all the routes (screens) in your app and what parameters they expect
// export type RootStackParamList = {
//   Home: undefined; // undefined because I'm not passing any params to the List screen
//   Details: {city: string};
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  
  

  // const notification = usePushNotification()
  // console.log("PPPP", notification)

  // const [notification, setNotification] = useState<Notification>();
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     if (remoteMessage.notification)
  //       setNotification({
  //         title: remoteMessage.notification.title || 'New Notification',
  //         body:
  //           remoteMessage.notification.body || 'You have a new notification.',
  //       });

  //     console.log(JSON.stringify(remoteMessage), 'ooooooooo');
  //   });

  //   return unsubscribe;
  // }, []);

  // console.log(notification, 'eeeeeee');



  useEffect(()=>{
    const requestUserPermission = async () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
     const authStatus = await messaging().requestPermission();
     const enabled =
       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

     if (enabled) {
       console.log('Authorization status:', authStatus);
       const token = await messaging().getToken();
       console.log('FCM token:', token);
     }
   };

   requestUserPermission();
   },[])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <>
      <NotificationService/>
      <AppNavigator/>
    </>
  );
}
