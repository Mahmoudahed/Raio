import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Radio } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type TransmissionOverlayProps = {
  transmission: {
    id: number;
    sender: string;
    channel: string;
    timestamp: string;
    message: string;
    type: string;
    isEmergency: boolean;
  };
};

export function TransmissionOverlay({ transmission }: TransmissionOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
    
    // Pulse animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
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
    
    return () => {
      pulseAnim.stopAnimation();
    };
  }, [fadeAnim, pulseAnim]);
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim },
        transmission.isEmergency && styles.emergencyContainer
      ]}
    >
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Radio 
            size={24} 
            color={transmission.isEmergency ? '#FFD166' : '#06D6A0'} 
          />
        </Animated.View>
        <Text style={styles.title}>
          {transmission.isEmergency ? 'EMERGENCY TRANSMISSION' : 'INCOMING TRANSMISSION'}
        </Text>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.sender}>{transmission.sender}</Text>
        <Text style={styles.channel}>{transmission.channel}</Text>
      </View>
      
      <Text style={styles.message}>{transmission.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(26, 32, 44, 0.95)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#06D6A0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  emergencyContainer: {
    backgroundColor: 'rgba(44, 11, 11, 0.95)',
    borderLeftColor: '#D62828',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.highlightText,
  },
  channel: {
    fontSize: 14,
    color: Colors.dark.mutedText,
  },
  message: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 22,
  },
});