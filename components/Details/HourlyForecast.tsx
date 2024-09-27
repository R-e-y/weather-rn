import React, {useContext} from 'react';
import DetailWrapper from './DetailWrapper';
import WeatherColorsContext from '../WeatherColorsContext';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Forecast, ForecastProps} from '../../types/Weather';


export default function HourlyForecast({forecast}: ForecastProps) {
  const weatherColors = useContext(WeatherColorsContext);
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
            <Text>
              {typeof item.temp === 'string' ? `${item.temp}` : `${item.temp}°`}
            </Text>
          </View>
        )}
      />
    </DetailWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'lightblue',
    minHeight: 170,
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
  currentTemp: {
    fontSize: 60,
  },
  currentIcon: {
    width: 70,
    height: 70,
  },
  forecastIcon: {
    width: 35,
    height: 35,
  },
  rainProb: {
    color: 'rgb(69, 135, 225)',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
