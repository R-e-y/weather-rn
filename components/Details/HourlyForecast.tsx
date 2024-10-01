import DetailWrapper from './DetailWrapper';
import {useWeatherColors} from '../../contexts/WeatherColorsContext';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {ForecastProps} from '../../types/Weather';


export default function HourlyForecast({
  forecast,
}: ForecastProps) {
  const {main, minor} = useWeatherColors();
  return (
    <DetailWrapper
      style={{...styles.wrapper, backgroundColor: minor}} 
      styleChildren={{paddingLeft: 0, paddingRight: 0}}
      title={'HOURLY FORECAST'}>
      <FlatList
        data={forecast}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.hourItem}>
            <Text>{item.datetime}</Text>
            <View>
              <Image
                source={
                  typeof item.icon === 'string' ? {uri: item.icon} : item.icon
                }
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
