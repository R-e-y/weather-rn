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
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getWeatherColors} from '../utils';
import useFetchWeather from '../hooks/useFetchWeather';
import WeatherColorsContext from '../hooks/WeatherColorsContext';
import {RootStackParamList} from '../App';
import CurrentInfo from '../components/Details/CurrentInfo';
import HourlyForecast from '../components/Details/HourlyForecast';
import DailyForecast from '../components/Details/DailyForecast';
import GeneralInfo from '../components/Details/GeneralInfo';

type DetailScreenRouteProp = RouteProp<RootStackParamList>;
interface DetailScreenProps {
  route: DetailScreenRouteProp;
  // navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
}

export default function DetailScreen({route}: DetailScreenProps) {
  const {city} = route.params!;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const {data: weatherList, isLoading, error} = useFetchWeather(city, 10);
  const weather = weatherList ? weatherList[0] : null;

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
    const weatherColors = getWeatherColors(weather.description);

    return (
      <WeatherColorsContext.Provider value={weatherColors}>
        <View
          style={[
            styles.screenContainer,
            {backgroundColor: weatherColors.main},
          ]}>
          <CurrentInfo weather={weather} value={scrollOffsetY} />
            <ScrollView
              scrollEventThrottle={5}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                {useNativeDriver: false},
              )}>
              <View style={styles.scrollWrapper}>
                <HourlyForecast forecast={weather.hourlyForecast} />
                <DailyForecast forecast={weather.dailyForecast} />
                <GeneralInfo weather={weather} />
              </View>
            </ScrollView>
        </View>
      </WeatherColorsContext.Provider>
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
    paddingBottom: 130
  },
});
