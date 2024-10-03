import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';

import {Weather} from '../../types/Weather';
import RadiusWrapper from '../Details/DetailWrapper';

interface ListItemProps {
  style: StyleProp<ViewStyle>;
  item: Weather;
  onPress: () => void;
  onLongPress: () => void;
}

export default function ListItem({item, ...props}: ListItemProps) {
  return (
    <View>
      <RadiusWrapper style={[props.style, styles.container]}>
        <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
            }}>
            <View style={{flex: 0.7}}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {item.city}
              </Text>
              <Text>{item.localtime}</Text>
              <Text style={styles.bottomLine}>{item.description}</Text>
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flex: 0.3,
              }}>
              <Text style={{fontSize: 40}}>{item.temp}°</Text>
              <View style={styles.bottomLine}>
                <Text>
                  L:{item.temp_min}° H:{item.temp_max}°
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </RadiusWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomLine: {
    marginTop: 20,
  },
  container: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});
