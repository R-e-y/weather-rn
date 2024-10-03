import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from '../components/common/ListItem';
import SearchBar from '../components/common/SearchBar';
import {Weather} from '../types/Weather';
import Header from '../components/common/Header';
import useFetchWeather from '../hooks/useFetchWeather';
import {getWeatherColors} from '../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CITIES, City } from '../constants';

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
  //refers to a specific route name defined in your RootStackParamList type.
  //It's telling TypeScript that the navigation prop (DetailScreenNavigationProp)
  //is typed specifically for the 'Home' screen in your navigation stack.
>;

type Props = {
  navigation: DetailScreenNavigationProp;
};


export default function ListScreen({navigation}: Props) {
  const [data, setData] = useState(CITIES);
  const [cityToAdd, setCityToAdd] = useState('');
  const [cityToDelete, setCityToDelete] = useState('');
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [filterText, setFilterText] = useState('');
  const [forecastDaysCount, setForecastDaysCount] = useState(1);
  const [toStore, setToStore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: weathersToAdd,
    isLoading,
    error,
  } = useFetchWeather(cityToAdd, forecastDaysCount);

  useEffect(() => {
    // AsyncStorage.clear();
    loadCities();
  }, []);

  useEffect(() => {
    if (weathersToAdd) {
      setWeatherList(prev => [...prev, ...weathersToAdd]);
      toStore ? storeCity(weathersToAdd[0].city) : null;
      setFilterText('');
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
      ? (setCityToAdd(city), setToStore(true), setForecastDaysCount(1))
      : null;
  }

  function handleFilterTextChange(filterText: string) {
    setFilterText(filterText);
    const filteredData = CITIES.filter((city: City) =>
      city.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setData(filteredData);
  }

  return (
    //  <SafeAreaView>
    <View style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => { // seems to be necessary only for android
        //   // Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to delete {cityToDelete}?
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  setModalVisible(!modalVisible), deleteCity(cityToDelete);
                }}>
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Header title="Weather" />

      <SearchBar
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />

      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}

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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonDelete: {
    backgroundColor: '#ff4444',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
