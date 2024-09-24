declare global{
  var apiKey: string
}
globalThis.apiKey = '16f82f59dec74ab3be8140412241809';


import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';


import { Colors } from 'react-native/Libraries/NewAppScreen';
import ListScreen from './screens/ListScreen';


export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1
  };

  return (
    <SafeAreaView style={backgroundStyle}>

      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}

      <ListScreen/>

    </SafeAreaView>
  );

}


