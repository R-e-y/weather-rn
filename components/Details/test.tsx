import React, { useRef } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const Scroll_Distance = 150; // Set your desired scroll distance

const WeatherApp = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header style based on scroll position
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, -Scroll_Distance], // Move the header up
    extrapolate: 'clamp', // Prevents the header from moving beyond the bounds
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
        <Text style={styles.headerText}>Weather Header</Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16} // For smoother animations
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.content}>
          {/* Replace this with your actual content */}
          {[...Array(20)].map((_, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>Weather Detail {index + 1}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100, // Set your header height
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  scrollView: {
    marginTop: 100, // Same as header height to avoid overlap
  },
  content: {
    padding: 16,
  },
  item: {
    height: 80,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
});

export default WeatherApp;

