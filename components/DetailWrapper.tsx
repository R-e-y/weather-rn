import {ReactNode} from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  childrenStyle?: any;
  title?: string;
}

export default function DetailWrapper({children, ...props}: Props) {
  return (
    <View style={[styles.container, props.style]}>
      
      {props.title ? (
        <View
          style={styles.titleText}>
          <Text style={{color: 'grey'}}>{props.title}</Text>
        </View>
      ) : null}

      <View style={[styles.children, props.childrenStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // flex:1,
    borderRadius: 15,
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    // backgroundColor: 'lightgrey',
    
    // borderWidth:1
    // backgroundColor: '#d3d3d3',
  },

  titleText:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },

  children: {
    flex:1,
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth:1
  },
});
