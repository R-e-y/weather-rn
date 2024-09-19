import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  FlatList,
  View,
  Text,
  Pressable,
} from 'react-native';

import {fetchWeather} from '../utils';

import ListItem from '../components/ListItem';
import SearchBar from '../components/SearchBar';
import DetailScreen from './DetailScreen';
import {Weather} from '../models/Weather';
import {createWeather} from '../utils';

const CITIES = require('../CITIES.json');


export default function ListScreen() {
  const [data, setData] = useState(CITIES);
  const [fullData, setFullData] = useState(CITIES);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // const apiKey = '16f82f59dec74ab3be8140412241809';


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
    const filteredData = fullData.filter((city) =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  if (isOpen) {
    return (
        <DetailScreen onPress={handleCloseDetails} city={selectedCity} />
    );
  } else {
    return (
      <View>
        <Text>Weather</Text>

        <SearchBar
          filterText={filterText}
          handleFilterTextChange={handleFilterTextChange}
          data={data}
          onPress={handleSelect}
        />

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
    );
  }
}
