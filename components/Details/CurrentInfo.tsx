import {Animated, StyleSheet, Text} from 'react-native';
import {Weather} from '../../types/Weather';


interface CurrentInfoProps {
  weather: Weather;
  value: any;
  maxHeight: number;
  minHeight: number;
  scrollDistance: number
}

export default function CurrentInfo({weather, ...props}: CurrentInfoProps) {
  const animatedContainerHeight = props.value.interpolate({
    inputRange: [0, props.scrollDistance],
    outputRange: [props.maxHeight, props.minHeight],
    extrapolate: 'clamp',
  });

  const opacity = props.value.interpolate({
    inputRange: [0, props.scrollDistance / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const opacityInverse = props.value.interpolate({
    inputRange: [0, props.scrollDistance / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{...styles.currentContainer, height: animatedContainerHeight}}>
      <Animated.Image
        source={{uri: weather.icon}}
        style={{...styles.currentIcon, opacity: opacity}}></Animated.Image>

      <Text style={styles.currentCity}>{weather.city}</Text>

      <Animated.Text style={{opacity: opacityInverse}}>
        {weather.temp}° | {weather.description}
      </Animated.Text>

      <Animated.Text style={{...styles.currentTemp, opacity: opacity}}>
        {weather.temp}°
      </Animated.Text>

      <Animated.Text style={{opacity: opacity}}>
        {weather.description}
      </Animated.Text>

      <Animated.Text style={{opacity: opacity}}>
        L:{weather.temp_min}° H:{weather.temp_max}°
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  currentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 5
  },

  cont: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 50,
  },

  currentCity: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  currentTemp: {
    fontSize: 60,
  },
  currentIcon: {
    width: 80,
    height: 80,
  },
});
