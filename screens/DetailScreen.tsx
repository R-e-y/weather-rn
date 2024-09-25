import React, {useContext, useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';

import {Weather, Forecast} from '../types/Weather';
import {getWeekday, getWeatherColors} from '../utils';
import DetailWrapper from '../components/DetailWrapper';
import useFetchWeather from '../useFetchWeather';
import WeatherColorsContext from '../components/WeatherColorsContext';
// import {useWeatherColors, WeatherColorsProvider} from '../components/WeatherColorsContext';


interface DetailScreenProps {
  city: string;
  onPress: () => void;
}

interface WeatherProps {
  weather: Weather;
}

interface ForecastProps {
  forecast: Forecast[];
}




export default function DetailScreen({city, onPress}: DetailScreenProps) {
  const {data: weather, isLoading, error} = useFetchWeather(city, 10);

  
  // console.log('111111111', weatherColors, typeof(weatherColors)) /////////////////////////////


  if (error) {
    console.error(error);
    return <Text>Could not fetch data</Text>;
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (weather) {
    const weatherColors = getWeatherColors(weather.description)

    return (
      <WeatherColorsContext.Provider value={weatherColors}>
        <View style={[styles.screenContainer, {backgroundColor: weatherColors.main}]}>
          <CurrentInfo weather={weather} />
  
          <View style={styles.scrollWrapper}>
            <ScrollView>
              <HourlyForecast forecast={weather.hourlyForecast} />
  
              <DailyForecast forecast={weather.dailyForecast} />
  
              <GeneralInfo weather={weather} />
            </ScrollView>
          </View>
  
          <Button onPress={onPress} title="Back" />
        </View>
      </WeatherColorsContext.Provider>
    );
  } 
  else {
    return (
      <View>
        <Text>Add more weather details</Text>
      </View>
    );
  }
}

function CurrentInfo({weather}: WeatherProps) {
  return (
    <View style={styles.currentContainer}>
      <Image source={{uri: weather.icon}} style={styles.currentIcon}></Image>
      <Text style={styles.currentCity}>{weather.city}</Text>
      <Text style={styles.currentTemp}>{weather.temp}°</Text>
      <Text>{weather.description}</Text>
      <Text>
        L:{weather.temp_min}° H:{weather.temp_max}°
      </Text>
    </View>
  );
}

function HourlyForecast({forecast}: ForecastProps) {
  const weatherColors = useContext(WeatherColorsContext)

  // console.log( weatherColors, typeof(weatherColors)) /////////////////////////////
  return (
    <DetailWrapper
      style={[styles.wrapper, {backgroundColor: weatherColors?.minor}]}
      childrenStyle={{paddingLeft: 0, paddingRight: 0}}
      title={'HOURLY FORECAST'}>
      <FlatList
        data={forecast}
        horizontal={true}
        renderItem={({item}) => (
          <View style={styles.hourItem}>
            <Text>{item.datetime}</Text>
            <View>
              <Image
                source={{uri: item.icon}}
                style={styles.forecastIcon}></Image>

              {item.rain_prob ? (
                <Text style={styles.rainProb}>{item.rain_prob}%</Text>
              ) : null}
            </View>
            <Text>{typeof(item.temp) === 'string' ?  `${item.temp}` : `${item.temp}°`}</Text>
          </View>
        )}
      />
    </DetailWrapper>
  );
}

function DailyForecast({forecast}: ForecastProps) {
  const weatherColors = useContext(WeatherColorsContext)
  return (
    <DetailWrapper style={[styles.wrapper, {backgroundColor: weatherColors?.minor}]} title={'10-DAY FORECAST'}>
      <FlatList
        scrollEnabled={false}
        data={forecast}
        renderItem={({item}) => (
          <View style={styles.dayItem}>
            <Text style={styles.dayText}>{getWeekday(item.datetime)}</Text>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: item.icon}}
                style={styles.forecastIcon}></Image>
              {item.rain_prob ? (
                <Text style={styles.rainProb}>{item.rain_prob}%</Text>
              ) : null}
            </View>

            <View style={styles.dayTemp}>
              <Text>{item.temp_min}° </Text>
              <Text>{item.temp_max}°</Text>
            </View>
          </View>
        )}
      />
    </DetailWrapper>
  );
}

function GeneralInfo({weather}: WeatherProps) {
  const weatherColors = useContext(WeatherColorsContext)
  return (
    <View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <DetailWrapper style={[styles.wrapperSquare, {backgroundColor: weatherColors?.minor}]} title="FEELS LIKE">
          <Text style={styles.generalText}>{weather.feels_like}°</Text>
        </DetailWrapper>

        <DetailWrapper style={[styles.wrapperSquare, {backgroundColor: weatherColors?.minor}]} title="PRESSURE">
          <Text style={styles.generalText}>{weather.pressure} hPa</Text>
        </DetailWrapper>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <DetailWrapper style={[styles.wrapperSquare, {backgroundColor: weatherColors?.minor}]} title="HUMIDITY">
          <Text style={styles.generalText}>{weather.humidity}%</Text>
        </DetailWrapper>

        <DetailWrapper style={[styles.wrapperSquare, {backgroundColor: weatherColors?.minor}]} title="VISIBILITY">
          <Text style={styles.generalText}>{weather.visibility} km</Text>
        </DetailWrapper>
      </View>

      <DetailWrapper style={[styles.wrapper, {backgroundColor: weatherColors?.minor}]} title="TWILIGHT">
        <Text>{weather.sunrise}</Text>
        <Text>{weather.sunset}</Text>
      </DetailWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },

  currentContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  currentCity: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  currentTemp: {
    fontSize: 60,
  },
  currentIcon: {
    width: 70,
    height: 70,
  },

  scrollWrapper: {
    flex: 0.7,
    padding: 15,
  },
  hourItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 5,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    // borderWidth:1
  },
  forecastIcon: {
    width: 35,
    height: 35,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: 10,
    // paddingRight: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    // borderWidth: 1,
    minHeight: 50,
  },

  dayText: {
    flex: 0.3,
  },

  dayTemp: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  generalText: {
    // fontWeight: 'bold',
    fontSize: 35,
  },

  wrapper: {
    // backgroundColor: 'lightblue',
    minHeight: 170,
  },

  wrapperSquare: {
    // backgroundColor: 'lightblue',
    height: 170,
    width: 170,
  },

  rainProb: {
    color: 'rgb(69, 135, 225)',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
