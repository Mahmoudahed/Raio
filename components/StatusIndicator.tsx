import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Battery, Signal, Wifi } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type StatusIndicatorProps = {
  type: 'battery' | 'signal' | 'status';
  value: number | string;
};

export function StatusIndicator({ type, value }: StatusIndicatorProps) {
  let icon;
  let color;
  let valueDisplay;

  switch (type) {
    case 'battery':
      color = getBatteryColor(value as number);
      valueDisplay = `${value}%`;
      icon = <Battery size={20} color={color} />;
      break;
    case 'signal':
      color = getSignalColor(value as number);
      valueDisplay = `${value}/5`;
      icon = <Signal size={20} color={color} />;
      break;
    case 'status':
      color = getStatusColor(value as string);
      valueDisplay = value as string;
      icon = <Wifi size={20} color={color} />;
      break;
  }

  return (
    <View style={styles.container}>
      {icon}
      <Text style={[styles.value, { color }]}>{valueDisplay}</Text>
    </View>
  );
}

const getBatteryColor = (value: number): string => {
  if (value > 50) return '#06D6A0';
  if (value > 20) return '#FFD166';
  return '#D62828';
};

const getSignalColor = (value: number): string => {
  if (value > 3) return '#06D6A0';
  if (value > 1) return '#FFD166';
  return '#D62828';
};

const getStatusColor = (status: string): string => {
  if (status === 'connected') return '#06D6A0';
  if (status === 'connecting') return '#FFD166';
  return '#D62828';
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: '500',
  },
});