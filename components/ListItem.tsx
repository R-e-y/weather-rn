import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Weather} from '../types/Weather';
import RadiusWrapper from './DetailWrapper';

interface ListItemProps {
  item: Weather;
  onPress: () => void;
}

export default function ListItem({item,  onPress}: ListItemProps) {
  return (
    <RadiusWrapper style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={onPress}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item.city}</Text>
            <Text>{item.localtime}</Text>
            <Text style={styles.bottomLine}>{item.description}</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 35}}>{item.temp}°</Text>
            <View style={styles.bottomLine}>
              <Text>
                L:{item.temp_min}° H:{item.temp_max}°
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    </RadiusWrapper>
  );
}


const styles = StyleSheet.create({
  bottomLine: {
    marginTop: 20,
  },
});
