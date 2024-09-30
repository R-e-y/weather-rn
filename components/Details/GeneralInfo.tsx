import { StyleSheet, Text, View } from "react-native";
import DetailWrapper from "./DetailWrapper";
import { WeatherProps } from "../../types/Weather";
import { useWeatherColors } from "../../contexts/WeatherColorsContext";


export default function GeneralInfo({weather}: WeatherProps) {
    const {main, minor} = useWeatherColors();
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <DetailWrapper
            style={[
              styles.wrapperSquare,
              {backgroundColor: minor},
            ]}
            title="FEELS LIKE">
            <Text style={styles.generalText}>{weather.feels_like}°</Text>
          </DetailWrapper>
  
          <DetailWrapper
            style={[
              styles.wrapperSquare,
              {backgroundColor: minor},
            ]}
            title="PRESSURE">
            <Text style={styles.generalText}>{weather.pressure} hPa</Text>
          </DetailWrapper>
        </View>
  
        <View style={{flex: 1, flexDirection: 'row'}}>
          <DetailWrapper
            style={[
              styles.wrapperSquare,
              {backgroundColor: minor},
            ]}
            title="HUMIDITY">
            <Text style={styles.generalText}>{weather.humidity}%</Text>
          </DetailWrapper>
  
          <DetailWrapper
            style={[
              styles.wrapperSquare,
              {backgroundColor: minor},
            ]}
            title="VISIBILITY">
            <Text style={styles.generalText}>{weather.visibility} km</Text>
          </DetailWrapper>
        </View>
  
        <DetailWrapper
          style={[styles.wrapper, {backgroundColor: minor}]}
          title="TWILIGHT">
          <Text>{weather.sunrise}</Text>
          <Text>{weather.sunset}</Text>
        </DetailWrapper>
      </View>
    );
  }

  const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: 'lightblue',
        minHeight: 170,
      },
   
    wrapperSquare: {
        // backgroundColor: 'lightblue',
        height: 170,
        width: 170,
      },

      generalText: {
        // fontWeight: 'bold',
        fontSize: 35,
      },
  });
  