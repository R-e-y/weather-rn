import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';

interface SearchBarProps {
  filterText: string;
  handleFilterTextChange: (filterText: string) => void;
}

export default function SearchBar({
  filterText,
  handleFilterTextChange,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={filterText}
        placeholder="Search for a city"
        onChangeText={filterText => handleFilterTextChange(filterText)}
        clearButtonMode="always"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFE1E7',
  },
});
