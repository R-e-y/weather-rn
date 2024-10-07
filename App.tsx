import React, { useEffect, useState } from 'react';
import {Alert, PermissionsAndroid, SafeAreaView, useColorScheme} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NotificationService from './services/NotificationService';
import AppNavigator from './navigation/AppNavigator';
import usePermission from './hooks/usePermission';


export default function App() {

  usePermission()

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
