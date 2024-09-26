import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

declare global {
  var apiKey: string;
}
globalThis.apiKey = '16f82f59dec74ab3be8140412241809';

// This is the type that defines all the routes (screens) in your app and what parameters they expect
export type RootStackParamList = {
  Home: undefined; // undefined because I'm not passing any params to the List screen
  Details: {city: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          /> */}

        <Stack.Screen name="Home" component={ListScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
