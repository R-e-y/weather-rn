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

import {fetchWeather} from '../utils';
import {Weather, Forecast} from '../types/Weather';
import {createWeather, getWeekday} from '../utils';
import RadiusWrapper from '../components/RadiusWrapper';
import useFetchWeather from '../useFetchWeather';

interface DetailScreenProps {
  city: string;
  onPress: () => void;
}

interface CurrentInfoProps {
  weather: Weather;
}

interface ForecastProps {
  forecast: Forecast[];
}

// interface DailyForecastProps {
//   forecast: Forecast[];
// }



export default function DetailScreen({city, onPress}: DetailScreenProps) {
  // const [weather, setWeather] = useState<Weather>();

  const {data: weather, isLoading, error} = useFetchWeather(city, 10)

  // useEffect(() => {
  //   (async () => {
      // const weatherData = await fetchWeather(apiKey, city, 10);
  //     const newWeather = createWeather(weatherData, true);
  //     setWeather(newWeather);
  //   })();
  // }, []);

  // data? console.log(data, 'PPPPPPP') : console.log('PODOZHDAT NADO')

  // const weather = createWeather(weatherData, true);
  if (error){ 
    console.error(error)
    return <Text>Could not fetch data</Text>
  }

  if (isLoading){ return(
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
  )
}

  if (weather) {
    return (
      <View style={styles.screenContainer}>
        <CurrentInfo weather={weather} />

        <View style={styles.scrollWrapper}>
          <ScrollView>
            <HourlyForecast forecast={weather.hourly_f} />

            <DailyForecast forecast={weather.daily_f} />

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
    // <View style={styles.hourlyContainer}>

    <RadiusWrapper styles={{backgroundColor: 'lightblue'}} title={'HOURLY FORECAST'}>
      {/* <View style={styles.forecastTextItem}>
        <Text style={{color:'grey'}}> HOURLY FORECAST </Text>
      </View> */}
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
    </RadiusWrapper>

    // </View>
  );
}

function DailyForecast({forecast}: ForecastProps) {
  return (
    // /<View style={styles.dailyContainer}>
      <RadiusWrapper styles={{backgroundColor: 'lightblue'}} title={'10-DAY FORECAST'}>
        
        {/* <Text style={{color:'grey'}}>
          {forecast.length}-DAY FORECAST
        </Text> */}
      
      <View>
        <FlatList
          data={forecast}
          renderItem={({item}) => (
            <View style={styles.dayItem}>
              <Text style={styles.dayText}>{getWeekday(item.datetime)}</Text>
              <Image
                source={{uri: item.icon}}
                style={styles.forecastIcon}></Image>

              <View style={styles.dayTemp}>
                <Text>{item.temp_min}° </Text>
                <Text>{item.temp_max}°</Text>
              </View>
            </View>
          )}
        />
      </View>
      </RadiusWrapper>
      
    // /</View>
  );
}

function GeneralInfo() {
  return (
  <View style={styles.generalContainer}>

  </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // padding: 20,
    // margin: 10,
  },

  currentContainer: {
    flex: 0.3,
    // borderWidth: 1,
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

  scrollWrapper: {
    flex: 0.7,
    padding: 5,
  },

  // hourlyContainer: {
  //   // flex: 2,
  //   borderWidth: 1,
  //   backgroundColor: 'beige',
  //   borderTopLeftRadius: 15,
  //   borderTopRightRadius: 15,
  //   borderBottomLeftRadius: 15,
  //   borderBottomRightRadius: 15,
  //   margin: 5,
  //   padding: 10,
  // },
  hourItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderTopWidth:1,
    borderTopColor: 'grey'
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },

  // dailyContainer: {
  //   // flex: 0.25,
  //   borderWidth: 1,
  //   borderTopLeftRadius: 15,
  //   borderTopRightRadius: 15,
  //   borderBottomLeftRadius: 15,
  //   borderBottomRightRadius: 15,
  //   margin: 5,
  //   padding: 15,
  // },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderTopColor: 'grey'

    // borderTopWidth: 1
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

  forecastTextItem: {
    // flex: 1,
    // color: 'lightgrey'
    // borderWidth:1,
    // borderBottomWidth: 1,
  },

  // radiusWrapper: {
  //   // borderWidth: 1,
  //   borderTopLeftRadius: 15,
  //   borderTopRightRadius: 15,
  //   borderBottomLeftRadius: 15,
  //   borderBottomRightRadius: 15,
  //   margin: 5,
  //   padding: 15,
  // },
});
