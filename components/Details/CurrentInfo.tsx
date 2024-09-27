import {Image, StyleSheet, Text, View} from 'react-native';
import {Weather, WeatherProps} from '../../types/Weather';



export default function CurrentInfo({weather}: WeatherProps) {
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

const styles = StyleSheet.create({
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
});
