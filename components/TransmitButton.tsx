import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Animated, Easing, Platform } from 'react-native';
import { Mic } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type TransmitButtonProps = {
  onPressIn: () => void;
  onPressOut: () => void;
  isTransmitting: boolean;
};

export function TransmitButton({ onPressIn, onPressOut, isTransmitting }: TransmitButtonProps) {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTransmitting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTransmitting, pulseAnim]);

  return (
    <View style={styles.container}>
      {isTransmitting && (
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.15],
                outputRange: [0.6, 0],
              }),
            },
          ]}
        />
      )}
      <TouchableOpacity
        style={[styles.button, isTransmitting && styles.transmitting]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.8}
      >
        <Mic size={32} color={isTransmitting ? '#ffffff' : Colors.dark.text} />
      </TouchableOpacity>
      <Text style={styles.label}>
        {isTransmitting ? 'TRANSMITTING' : 'PUSH TO TALK'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D62828',
    top: -10,
    left: -10,
    zIndex: 0,
  },
  button: {
    backgroundColor: Colors.dark.cardBackground,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.dark.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1,
  },
  transmitting: {
    backgroundColor: '#D62828',
    borderColor: '#FF3333',
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});