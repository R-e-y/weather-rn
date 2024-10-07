import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from '../components/common/ListItem';
import SearchBar from '../components/common/SearchBar';
import {Weather} from '../types/Weather';
import Header from '../components/common/Header';
import useFetchWeather from '../hooks/useFetchWeather';
import {getWeatherColors} from '../utils';
import {CITIES, City} from '../constants';
import {ListScreenNavigationProp} from '../types/Navigation';
import ConfirmationModal from '../components/common/ConfirmationModal';

interface Props {
  navigation: ListScreenNavigationProp;
}

export default function ListScreen({navigation}: Props) {
  const [data, setData] = useState(CITIES);
  const [cityToAdd, setCityToAdd] = useState<string[] | string>('');
  const [cityToDelete, setCityToDelete] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  const [toStore, setToStore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefresing] = useState(false)

  const forecastDaysCount = 1

  const {
    data: weathersToAdd,
    loading,
    error,
  } = useFetchWeather(cityToAdd, forecastDaysCount);

  useEffect(() => {
    // AsyncStorage.clear();
    loadCities();
  }, []);

  useEffect(() => {
    if (weathersToAdd) {
      if (toStore) {
        storeCity(weathersToAdd[0].city)
        setWeatherList(prev => [...prev, ...weathersToAdd]);
        setFilterText('');
      }
      else{
        setWeatherList(weathersToAdd)
      }
      
    }
  }, [weathersToAdd]);

  const loadCities = async () => {
    try {
      const storedCities = await AsyncStorage.getItem('cityList');
      if (storedCities != null) {
        const cities = JSON.parse(storedCities);

        setCityToAdd(cities);
        setToStore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const storeCity = async (city: string) => {
    try {
      let cities: string[] = [];
      const storedCities = await AsyncStorage.getItem('cityList');
      storedCities ? (cities = JSON.parse(storedCities)) : null;

      cities.push(city);
      const jsonValue = JSON.stringify(cities);
      await AsyncStorage.setItem('cityList', jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCity = async (cityToDelete: string) => {
    try {
      let cities: string[] = [];
      const storedCities = await AsyncStorage.getItem('cityList');
      storedCities ? (cities = JSON.parse(storedCities)) : null;
      const updatedCities = cities.filter(city => city !== cityToDelete);
      const updatedWeatherList = weatherList.filter(
        weather => weather.city !== cityToDelete,
      );

      setWeatherList(updatedWeatherList);

      const jsonValue = JSON.stringify(updatedCities);
      await AsyncStorage.setItem('cityList', jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  function isCityInList(city: string, arr: Weather[]) {
    return arr.some(obj => Object.values(obj).includes(city));
  }

  function handleSelect(city: string) {
    const cityInList = isCityInList(city, weatherList);
    !cityInList
      ? (setCityToAdd(city), setToStore(true), forecastDaysCount)
      : null;
  }

  function handleFilterTextChange(filterText: string) {
    setFilterText(filterText);
    const filteredData = CITIES.filter((city: City) =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  function handleModalClose(){
    setModalVisible(!modalVisible)
  }

  function handleDeleteCity(){
    setModalVisible(!modalVisible),
    deleteCity(cityToDelete)
  }

  function handleRefresh() {
    setRefresing(true)
    loadCities()
    setRefresing(false)
  }

  return (
    //  <SafeAreaView>
    <View style={{flex: 1}}>
      <ConfirmationModal
        modalVisible={modalVisible}
        title={`Do you want to delete ${cityToDelete}?`}
        onCancel = {handleModalClose}
        onConfirm={handleDeleteCity}
      />
  
      <Header title="Weather" />

      <SearchBar
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />

      <View style={{flex: 1}}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}

        {filterText ? (
          <View style={styles.filteredList}>
            <FlatList
              data={data}
              keyboardShouldPersistTaps='always'
              renderItem={({item}) => (
                <View style={styles.filteredText}>
                  <Text onPress={() => handleSelect(item.name)}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : null}

        <View style={styles.mainList}>
          <FlatList
            data={weatherList}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyboardShouldPersistTaps='always'
            renderItem={({item}) => (
              <ListItem
                style={{
                  backgroundColor: getWeatherColors(item.description).main,
                }}
                item={item}
                onPress={() =>
                  navigation.navigate('Details', {city: item.city})
                }
                onLongPress={() => {
                  setModalVisible(true);
                  setCityToDelete(item.city);
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    // flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // borderWidth: 1,
  },

  filteredList: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgb(243, 243, 243)',
    flex: 1,
    width: '100%',
  },

  mainList: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },

  filteredText: {
    paddingLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
});
