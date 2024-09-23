import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
import RadiusWrapper from './RadiusWrapper';

interface SearchBarProps {
  filterText: string;
  handleFilterTextChange: (filterText: string) => void;
}

export default function SearchBar({
  filterText,
  handleFilterTextChange,
}: SearchBarProps) {
  return (
    <RadiusWrapper>  
      <TextInput
        value={filterText}
        placeholder="Search for a city"
        onChangeText={filterText => handleFilterTextChange(filterText)}
        clearButtonMode="always"
        autoCorrect={false}
      />
    </RadiusWrapper>
   
  );
}

