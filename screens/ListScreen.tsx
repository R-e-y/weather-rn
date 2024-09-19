import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  FlatList,
  View,
  Text,
  Pressable,
} from 'react-native';

import ListItem from '../components/ListItem';
import SearchBar from '../components/SearchBar';
import DetailScreen from './DetailScreen';
import {Weather} from '../models/Weather';
import createWeather from '../models/Weather';

import useFetchWeather from '../useFetchWeather';

var CITIES = require('../CITIES.json');

export async function fetchWeather(apiKey: string, city: string, days: number) {
  //const [data, setData] = useState(null);
  const url = `https://api.weatherapi.com/v1/forecast.json?days=${days.toString()}&key=${apiKey}&q=${city}&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Could not fetch the data for that resource');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export default function ListScreen() {
  const [data, setData] = useState(CITIES);
  const [fullData, setFullData] = useState(CITIES);
  //const [weatherData, setWeatherData] = useState<any>({});
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  //const [isFound, setIsFound] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // const api = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiKey = '16f82f59dec74ab3be8140412241809';

  function isCityInList(city: string, arr: Weather[]) {
    return arr.some(obj => Object.values(obj).includes(city));
  }

  function addToList(weatherData: any) {
    try {
      // const newWeather: Weather = {
      //   city: weatherData.name,
      //   description: weatherData.weather[0].description,
      //   temp: weatherData.main.temp,
      //   feels_like: weatherData.main.feels_like,
      //   temp_min: weatherData.main.temp_min,
      //   temp_max: weatherData.main.temp_max,
      //   pressure: weatherData.main.pessure,
      //   humidity: weatherData.main.humidity,
      //   visibility: weatherData.visibility,
      //   sunrise: weatherData.sys.sunrise,
      //   sunset: weatherData.sys.sunset,
      // };

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
        // sconsole.log(weatherData,  selectedCity, city);
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
    const filteredData = fullData.filter(city =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  if (isOpen) {
    return (
      <View>
        <DetailScreen onPress={handleCloseDetails} city={selectedCity} />
      </View>
    );
  } else {
    // console.log(isOpen, 0, selectedCity);
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
