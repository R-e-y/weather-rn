import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import messaging from '@react-native-firebase/messaging';

export default function usePermission() {
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
}

