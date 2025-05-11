import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { VolumeX, Volume1, Volume2 } from 'lucide-react-native';
import Slider from '@/components/Slider';
import Colors from '@/constants/Colors';

type VolumeControlProps = {
  value: number;
  onChange: (value: number) => void;
};

export function VolumeControl({ value, onChange }: VolumeControlProps) {
  const getVolumeIcon = () => {
    if (value === 0) return <VolumeX size={22} color={Colors.dark.text} />;
    if (value < 50) return <Volume1 size={22} color={Colors.dark.text} />;
    return <Volume2 size={22} color={Colors.dark.text} />;
  };

  return (
    <View style={styles.container}>
      {getVolumeIcon()}
      <Slider 
        value={value} 
        onValueChange={onChange} 
        minimumValue={0}
        maximumValue={100}
        step={1}
        style={styles.slider}
      />
      <Text style={styles.valueText}>{value}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardBackground,
    padding: 12,
    borderRadius: 8,
  },
  slider: {
    flex: 1,
    marginHorizontal: 12,
    height: 40,
  },
  valueText: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.text,
  },
});