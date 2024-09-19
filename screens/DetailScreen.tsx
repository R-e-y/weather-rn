import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Pressable,
  Button,
} from 'react-native';

import {fetchWeather} from './ListScreen';
import {Weather} from '../models/Weather';
import createWeather from '../models/Weather';

interface DetailScreenProps {
  city: string;
  onPress: () => void;
}

export default function DetailScreen({city, onPress}: DetailScreenProps) {

  const apiKey = '16f82f59dec74ab3be8140412241809';

  const [weather, setWeather] = useState<Weather>();

  //console.log(city);

  useEffect(() => {
    (async () => {
      // console.log('hi1');
      const weatherData = await fetchWeather(apiKey, city, 10);
      //console.log('hi2', weatherData);

      const newWeather = createWeather(weatherData, true);
      console.log('hi3', newWeather);

      setWeather(newWeather);
      //console.log('hi4', weather);
    })();
  }, []);

  // const weatherData = fetchWeather(apiKey, city, 10)
  // const newWeather = createWeather(weatherData, true)

  // setWeather(newWeather)

  // useEffect(() => {
  //   const weatherGeneral = fetchWeather(api, apiKey, city)
  //   const weatherHourly = fetchWeather(apiHourly, apiKey, city)
  //   const weatherDaily = fetchWeather(apiDaily, apiKey, city, "10")

  //   const newWeather = createWeather(weatherGeneral, weatherHourly, weatherDaily)

  //   setWeather(newWeather)

  // }, [])

  return (
    <View>
      <Text>DetailScreen </Text>

      <CurrentInfo weather={weather} />

      <HourlyForecast />

      <DailyForecast />
      <Text>{city}</Text>

      <GeneralInfo />

      <Button onPress={onPress} title="Back" />
    </View>
  );
}

function CurrentInfo(weather: Weather) {
  return (
    <View>
      <Text> KK</Text>
    </View>
  );
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
