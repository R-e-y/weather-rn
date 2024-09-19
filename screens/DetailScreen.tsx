import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
} from 'react-native';

import {fetchWeather} from './ListScreen';
import {Weather} from '../models/Weather';
import createWeather from '../models/Weather';


interface DetailScreenProps {
  city: string;
  onPress: () => void;
}

export default function DetailScreen({city, onPress}: DetailScreenProps) {
  const [weather, setWeather] = useState<Weather>();
  const apiKey = '16f82f59dec74ab3be8140412241809';


  useEffect(() => {
    (async () => {
      const weatherData = await fetchWeather(apiKey, city, 10);
      const newWeather = createWeather(weatherData, true);
      setWeather(newWeather);
    })();
  }, []);


  return (
    <View>
      
      <CurrentInfo weather={weather} />

      <HourlyForecast />

      <DailyForecast />

      <GeneralInfo />

      <Button onPress={onPress} title="Back" />
    </View>
  );
}

interface CurrentInfoProps{
  weather: Weather | undefined
}



function CurrentInfo({weather}: CurrentInfoProps) {
  if (weather){
   

    return (
    <View style={styles.currentContainer}>
    
      <Image source={{uri: `https:${weather.icon}`}}  style={{ width: 64, height: 64 }}></Image>
      <Text style={styles.currentCity}>{weather.city}</Text>

      <Text style={styles.currentTemp}>{weather.temp}°</Text>

      <Text>{weather.description}</Text>
 
      <Text>H:{weather.temp_min}° L:{weather.temp_max}°</Text>
      
      
    </View>
    
  );
  } else{
    return (
      <View>
        <Text>Add more weather details</Text>
      </View>
    )
  }
  
}

function HourlyForecast() {
  return <View></View>;
}

function DailyForecast() {
  return <View></View>;
}

function GeneralInfo() {
  return <View></View>;
}


const styles = StyleSheet.create({
  currentContainer:{
    alignItems: 'center',
  },
  currentCity:{
    fontSize:20,
    fontWeight: 'bold'
  },
  currentTemp:{
    fontSize:60
  }

})
