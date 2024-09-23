import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {fetchWeather} from '../utils';

import ListItem from '../components/ListItem';
import SearchBar from '../components/SearchBar';
import DetailScreen from './DetailScreen';
import {Weather} from '../types/Weather';
import {createWeather} from '../utils';
import RadiusWrapper from '../components/RadiusWrapper';
import Header from '../components/Header';

const cities = require('../CITIES.json');

export default function ListScreen() {
  const [data, setData] = useState(cities);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function isCityInList(city: string, arr: Weather[]) {
    return arr.some(obj => Object.values(obj).includes(city));
  }

  function addToList(weatherData: any) {
    try {
      const newWeather = createWeather(weatherData, false);

      setWeatherList(prev => [...prev, newWeather]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSelect(city: string) {
    try {
      const isCityPresent = isCityInList(city, weatherList);

      if (!isCityPresent) {
        const weatherData = await fetchWeather(apiKey, city, 1);

        addToList(weatherData);
      }
    } catch (error) {
      console.error('Failed to add the city', error);
    }
  }

  function handleOpenDetails() {
    setIsOpen(true);
  }

  function handleCloseDetails() {
    setIsOpen(false);
  }

  function handleItemPress(city: string) {
    setSelectedCity(city);
  }

  function handleFilterTextChange(filterText: string) {
    setFilterText(filterText);
    const filteredData = cities.filter(city =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  if (isOpen) {
    return <DetailScreen onPress={handleCloseDetails} city={selectedCity} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Header title="Weather" />

        <View style={styles.search}>
          <SearchBar
            filterText={filterText}
            handleFilterTextChange={handleFilterTextChange}
          />
        </View>

        <View style={{flex: 1}}>
          {filterText ? (
            <View style={styles.list}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <View style={styles.dropText}>
                    <Text onPress={() => handleSelect(item.name)}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : null}

          <View style={styles.flat}>
            <FlatList
              data={weatherList}
              renderItem={({item}) => (
                <ListItem
                  item={item}
                  onItemSelect={handleItemPress}
                  onPress={handleOpenDetails}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    position: 'relative',
  },

  list: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgb(243, 243, 243)',
    flex: 1,
    width: '100%',

  },

  flat: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },

  dropText: {
    paddingLeft: 15,
    marginTop: 5,
    marginBottom: 10,

  },
});
