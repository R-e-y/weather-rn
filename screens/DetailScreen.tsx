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
  ActivityIndicator,
} from 'react-native';

import {Weather, Forecast} from '../types/Weather';
import {getWeekday} from '../utils';
import RadiusWrapper from '../components/DetailWrapper';
import useFetchWeather from '../useFetchWeather';
import DetailWrapper from '../components/DetailWrapper';

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
    return (
      <View style={styles.screenContainer}>
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
    );
  } else {
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
  return (
    <RadiusWrapper
      style={styles.wrapper}
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
    </RadiusWrapper>
  );
}

function DailyForecast({forecast}: ForecastProps) {
  return (
    <RadiusWrapper style={styles.wrapper} title={'10-DAY FORECAST'}>
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
    </RadiusWrapper>
  );
}

function GeneralInfo({weather}: WeatherProps) {
  // ------rain prob ------ remove from weather type, add func to calculate 24 hour forecast starting from now
  // feels like
  // pressure

  // humidity
  // visbility

  // sunrise
  // sunset

  return (
    <View style={styles.generalContainer}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <DetailWrapper style={styles.wrapperSquare} title="FEELS LIKE">
          <Text>{weather.feels_like}</Text>
        </DetailWrapper>

        <DetailWrapper style={styles.wrapperSquare} title="PRESSURE">
          <Text>{weather.pressure}</Text>
        </DetailWrapper>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <DetailWrapper style={styles.wrapperSquare} title="HUMIDITY">
          <Text>{weather.humidity}</Text>
        </DetailWrapper>

        <DetailWrapper style={styles.wrapperSquare} title="VISIBILITY">
          <Text>{weather.visibility}</Text>
        </DetailWrapper>
      </View>

      <DetailWrapper style={styles.wrapper} title="TWILIGHT">
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

  generalContainer: {
    // flex: 0.3,
    // borderWidth: 1,
    // margin:10
  },

  wrapper: {
    backgroundColor: 'lightblue',
    minHeight: 170,
  },

  wrapperSquare: {
    backgroundColor: 'lightblue',
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
