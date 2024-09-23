import {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  children?: ReactNode;
  styles?: any;
  title?: string;
}

export default function RadiusWrapper({children, ...props}: Props) {
  return (
    <View style={[styles.radiusWrapper, props.styles]}>
      {props.title ? <Text style={{color: 'grey'}}>{props.title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  radiusWrapper: {
    // borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgrey',
    // backgroundColor: '#d3d3d3',
  },
});
