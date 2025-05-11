import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusIndicator } from '@/components/StatusIndicator';
import { TransmitButton } from '@/components/TransmitButton';
import { EmergencyButton } from '@/components/EmergencyButton';
import { VolumeControl } from '@/components/VolumeControl';
import { useRadio } from '@/hooks/useRadio';
import Colors from '@/constants/Colors';
import { TransmissionOverlay } from '@/components/TransmissionOverlay';

export default function RadioScreen() {
  const { activeChannel, isTransmitting, startTransmission, endTransmission, incomingTransmission } = useRadio();
  const [volume, setVolume] = useState(80);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.statusBar}>
        <StatusIndicator type="signal" value={4} />
        <StatusIndicator type="battery" value={85} />
        <StatusIndicator type="status" value="connected" />
      </View>
      
      <View style={styles.displayArea}>
        <View style={styles.channelDisplay}>
          <Text style={styles.channelLabel}>ACTIVE CHANNEL</Text>
          <Text style={styles.channelValue}>{activeChannel?.name || 'NONE'}</Text>
          <Text style={styles.frequency}>{activeChannel?.frequency || '---'} MHz</Text>
        </View>
        
        <View style={styles.unitInfo}>
          <Text style={styles.unitLabel}>UNIT ID</Text>
          <Text style={styles.unitValue}>PATROL-35</Text>
        </View>
      </View>
      
      <View style={styles.controlArea}>
        <VolumeControl value={volume} onChange={setVolume} />
        
        <View style={styles.primaryControls}>
          <EmergencyButton />
          <TransmitButton 
            onPressIn={startTransmission} 
            onPressOut={endTransmission}
            isTransmitting={isTransmitting}
          />
        </View>
      </View>
      
      {/* Transmission overlay shown when receiving */}
      {incomingTransmission && (
        <TransmissionOverlay transmission={incomingTransmission} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.dark.headerBackground,
    gap: 16,
  },
  displayArea: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelDisplay: {
    backgroundColor: Colors.dark.cardBackground,
    padding: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  channelLabel: {
    color: Colors.dark.mutedText,
    fontSize: 14,
    marginBottom: 8,
  },
  channelValue: {
    color: Colors.dark.text,
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
  frequency: {
    color: Colors.dark.highlightText,
    fontSize: 18,
    fontWeight: '500',
  },
  unitInfo: {
    backgroundColor: Colors.dark.cardBackground,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  unitLabel: {
    color: Colors.dark.mutedText,
    fontSize: 14,
    marginBottom: 8,
  },
  unitValue: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: '600',
  },
  controlArea: {
    padding: 24,
    backgroundColor: Colors.dark.controlBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  primaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 24,
  },
});