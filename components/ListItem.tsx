import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Weather} from '../models/Weather';

interface ListItemProps {
  item: object;
  onItemSelect: (city: string) => void;
  onPress: () => void;
}

export default function ListItem({item, onItemSelect, onPress}: ListItemProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <TouchableOpacity onPress={() => {
            onPress();
            onItemSelect(item.city);
          }}>
        <Text
          
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {item.city}
        </Text>
        <View style={styles.sectionContent}>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {item.description}
          </Text>
          <Text>{item.temp}</Text>
        </View>
        <Text>Maximum: {item.temp_max}</Text>
        <Text>Minimum: {item.temp_min}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
