import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import ListItem from '../components/ListItem';
import SearchBar from '../components/SearchBar';
import DetailScreen from './DetailScreen';
import {Weather} from '../types/Weather';
import Header from '../components/Header';
import useFetchWeather from '../useFetchWeather';

const cities = require('../CITIES.json');

export default function ListScreen() {
  const [data, setData] = useState(cities);
  const [cityToAdd, setCityToAdd] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const {data: weather, isLoading, error} = useFetchWeather(cityToAdd, 1);

  
  useEffect(() => {
    if (weather) {
      setWeatherList(prev => [...prev, weather]);
    }
  }, [weather]);

  function isCityInList(city: string, arr: Weather[]) {
    return arr.some(obj => Object.values(obj).includes(city));
  }

  function handleSelect(city: string) {
    const cityInList = isCityInList(city, weatherList);
    !cityInList ? setCityToAdd(city) : null;
  }

  function handleOpenDetails(city: string) {
    setSelectedCity(city);
    setIsOpen(true);
  }

  function handleCloseDetails() {
    setIsOpen(false);
  }

  function handleFilterTextChange(filterText: string) {
    setFilterText(filterText);
    const filteredData = cities.filter(city =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  if (isOpen) {
    return <DetailScreen onPress={handleCloseDetails} city={selectedCity} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Header title="Weather" />

        <SearchBar
          filterText={filterText}
          handleFilterTextChange={handleFilterTextChange}
        />

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
                  onPress={() => handleOpenDetails(item.city)}
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
