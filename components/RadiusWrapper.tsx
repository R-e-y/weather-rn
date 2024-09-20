import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children?: ReactNode;
}

export default function RadiusWrapper({children, ...props}: Props) {
  return <View style={styles.radiusWrapper}>{children}</View>;
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
    backgroundColor: '#d3d3d3',
  },
});
