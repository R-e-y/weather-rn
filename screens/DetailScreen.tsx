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
  FlatList,
  ScrollView,
} from 'react-native';

import {fetchWeather} from './ListScreen';
import {Weather, Forecast} from '../models/Weather';
import createWeather from '../models/Weather';

interface DetailScreenProps {
  city: string;
  onPress: () => void;
}

interface CurrentInfoProps {
  weather: Weather;
}

interface HourlyForecastProps {
  forecast: Forecast[];
}

interface DailyForecastProps {
  forecast: Forecast[];
  // function to get weekdays from date
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

  if (weather) {
    return (
      <View style={styles.screenContainer}>
        <CurrentInfo weather={weather} />

        <View style={styles.scrollWrapper}>
          <ScrollView>
            <HourlyForecast forecast={weather.hourly_f} />

            <DailyForecast forecast={weather.daily_f}/>

            <GeneralInfo />
          </ScrollView>
        </View>

        <Button onPress={onPress} title="Back" />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Add more weather details</Text>
      </View>
    );
  }
}

function CurrentInfo({weather}: CurrentInfoProps) {
  return (
    <View style={styles.currentContainer}>
      <Image
        source={{uri: weather.icon}}
        style={styles.currentIcon}></Image>
      <Text style={styles.currentCity}>{weather.city}</Text>
      <Text style={styles.currentTemp}>{weather.temp}°</Text>
      <Text>{weather.description}</Text>
      <Text>
        L:{weather.temp_min}° H:{weather.temp_max}°
      </Text>
    </View>
  );
}

function HourlyForecast({forecast}: HourlyForecastProps) {
  return (
    <View style={styles.hourlyContainer}>
      <FlatList
        data={forecast}
        horizontal={true}
        renderItem={({item}) => (
            <View style={styles.hourItem}>
              <Text>{item.datetime}</Text>
              <Image
                source={{uri: item.icon}}
                style={styles.forecastIcon}></Image>
              <Text>{item.temp}°</Text>
            </View>
        )}
      />
    </View>
  );
}

function DailyForecast({forecast}: DailyForecastProps) {
  return( 
  <View style={styles.dailyContainer}>
    <Text> {forecast.length}-DAY FORECAST </Text>
    <View >
      <FlatList
        data={forecast}
        renderItem={({item}) => (
            <View style={styles.dayItem}>
              <Text>{item.datetime}</Text>
              <Image
                source={{uri: item.icon}}
                style={styles.forecastIcon}></Image>
              <Text>{item.temp_min}° {item.temp_max}°</Text>
            </View>
        )}
      />

    </View>
    

  </View>
  );
}

function GeneralInfo() {
  return <View style={styles.generalContainer}></View>;
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    borderWidth: 1,
    // justifyContent: 'space-between',
    // padding: 20,
    // margin: 10,
  },

  currentContainer: {
    flex: 0.3,
    borderWidth: 1,
    alignItems: 'center',
    // margin:10
  },
  currentCity: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentTemp: {
    fontSize: 60,
  },
  currentIcon: {
    width: 70,
    height: 70,
  },

  scrollWrapper:{
    flex: 0.7,
    padding: 5,
  },

  hourlyContainer: {
    // flex: 2,
    borderWidth: 1,
    backgroundColor: 'beige',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: 5,
  },
  hourItem: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },

  dailyContainer: {
    backgroundColor: 'pink',
    // flex: 0.25,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: 5,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
  },

  generalContainer: {
    // flex: 0.3,
    // borderWidth: 1,
    // margin:10
  },
});
