import { useContext } from "react";
import { ForecastProps } from "../../types/Weather";
import WeatherColorsContext from "../WeatherColorsContext";
import DetailWrapper from "./DetailWrapper";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getWeekday } from "../../utils";


export default function DailyForecast({forecast}: ForecastProps) {
    const weatherColors = useContext(WeatherColorsContext);
    return (
      <DetailWrapper
        style={[styles.wrapper, {backgroundColor: weatherColors?.minor}]}
        title={'10-DAY FORECAST'}>
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


  const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: 'lightblue',
        minHeight: 170,
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
  });