import {StyleSheet, Text, View} from 'react-native';

interface Props {
    title: string;
  }
  

export default function Header({title}: Props) {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize:30,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingTop: 10,
    }
})
