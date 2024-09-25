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
    <RadiusWrapper style={{backgroundColor: 'white', paddingBottom: 10, paddingTop: 10}}>
      <TouchableOpacity
        onPress={onPress}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', flex:1}}>

          <View style={{ flex:0.70}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item.city}</Text>
            <Text>{item.localtime}</Text>
            <Text style={styles.bottomLine}>{item.description}</Text>
          </View>

          <View style={{alignItems: 'flex-end', justifyContent: 'space-between', flex: 0.30}}>
            <Text style={{fontSize: 40}}>{item.temp}°</Text>
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
