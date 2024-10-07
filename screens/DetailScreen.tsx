import React, {useRef} from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {getWeatherColors} from '../utils';
import useFetchWeather from '../hooks/useFetchWeather';

import CurrentInfo from '../components/details/CurrentInfo';
import HourlyForecast from '../components/details/HourlyForecast';
import DailyForecast from '../components/details/DailyForecast';
import GeneralInfo from '../components/details/GeneralInfo';
import {WeatherColorsProvider} from '../contexts/WeatherColorsContext';
import { DetailScreenRouteProp } from '../types/Navigation';


interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

export default function DetailScreen({route}: DetailScreenProps) {
  const {city} = route.params!;

  const scrollY = useRef(new Animated.Value(0)).current;
  const minHeight = 80;
  const maxHeight = 280;
  const scrollDistance = maxHeight - minHeight;

  const translateContent = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, scrollDistance],
    extrapolate: 'clamp',
  });

  const forecastDaysCount = 3

  const {data: weatherList, loading, error} = useFetchWeather(city, forecastDaysCount);
  const weather = weatherList ? weatherList[0] : null;

  if (error) {
    console.error(error);
    return <Text>Could not fetch data</Text>;
  }

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (weather) {
    const weatherColors = getWeatherColors(weather.description);

    return (
      <WeatherColorsProvider value={weatherColors}>
        <View
          style={[
            styles.screenContainer,
            {backgroundColor: weatherColors.main},
          ]}>
          <CurrentInfo
            weather={weather}
            value={scrollY}
            maxHeight={maxHeight}
            minHeight={minHeight}
            scrollDistance={scrollDistance}
          />
          <Animated.ScrollView
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}>
            <Animated.View
              style={{
                ...styles.scrollWrapper,
                transform: [{translateY: translateContent}],
              }}>
              <HourlyForecast forecast={weather.hourlyForecast} />
              <DailyForecast forecast={weather.dailyForecast} />
              <GeneralInfo weather={weather} />
            </Animated.View>
          </Animated.ScrollView>
        </View>
      </WeatherColorsProvider>
    );
  } else {
    return (
      <View>
        <Text>Add more weather details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    // flex: 1,
  },
  scrollWrapper: {
    // flex: 0.7,
    padding: 15,
    paddingBottom: 300,
  },
});
