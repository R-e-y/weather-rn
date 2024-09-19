import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface SearchBarProps {
  data: object[];
  filterText: string;
  handleFilterTextChange: (filterText : string) => void;
  onPress?: (city: string) => void;
}

export default function SearchBar({
  data,
  filterText,
  handleFilterTextChange,
  onPress,
}: SearchBarProps) {
  return (
    <>
      <TextInput
        value={filterText}
        placeholder="Search for a city"
        onChangeText={filterText => handleFilterTextChange(filterText)}
        clearButtonMode="always"
        autoCorrect={false}
      />

      {filterText ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Text onPress={() => onPress(item.name)}>{item.name}</Text>
          )}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#90EE90', // Light green color
    padding: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000', // Text color
  },
  headerCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
