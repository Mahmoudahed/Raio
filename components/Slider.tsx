import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Platform } from 'react-native';
import Colors from '@/constants/Colors';

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  style?: StyleProp<ViewStyle>;
};

export default function Slider({ 
  value, 
  onValueChange, 
  minimumValue, 
  maximumValue, 
  step = 1, 
  style 
}: SliderProps) {
  // For web, we can use the native HTML input slider
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step}
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          style={{
            width: '100%',
            height: 40,
            accentColor: Colors.dark.tint,
          }}
        />
      </View>
    );
  }
  
  // For mobile platforms, we'd implement a custom slider here
  // This is a simplified version as the actual mobile implementation would use gestures
  // For a complete implementation, consider using a library like react-native-gesture-handler
  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` 
            }
          ]} 
        />
        <View 
          style={[
            styles.thumb, 
            { 
              left: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` 
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: Colors.dark.border,
    borderRadius: 2,
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.dark.tint,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark.tint,
    top: -6,
    marginLeft: -8,
  },
});