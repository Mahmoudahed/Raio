import React, { useState, useEffect, createContext, useContext } from 'react';
import { Platform } from 'react-native';
import { mockChannels, mockTransmissionLogs } from '@/data/mockData';

// Define types
type Channel = {
  id: number;
  name: string;
  frequency: string;
  description: string;
  mode: string;
  region: string;
  priority: string;
  active: boolean;
  encrypted: boolean;
  favorite: boolean;
  primary: boolean;
  activeUsers: number;
};

type TransmissionLog = {
  id: number;
  sender: string;
  channel: string;
  timestamp: string;
  message: string;
  type: 'incoming' | 'outgoing';
  isEmergency: boolean;
};

type RadioSettings = {
  callSign: string;
  unitId: string;
  voiceActivation: boolean;
  transmissionBeep: boolean;
  backgroundMode: boolean;
  darkMode: boolean;
  hapticFeedback: boolean;
};

type RadioContextType = {
  channels: Channel[];
  activeChannel: Channel | null;
  setActiveChannel: (channel: Channel) => void;
  isTransmitting: boolean;
  startTransmission: () => void;
  endTransmission: () => void;
  sendEmergencyAlert: () => void;
  transmissionLogs: TransmissionLog[];
  incomingTransmission: TransmissionLog | null;
  settings: RadioSettings;
  updateSettings: (newSettings: RadioSettings) => void;
};

// Create context
const RadioContext = createContext<RadioContextType | undefined>(undefined);

// Provider component
export function RadioProvider({ children }: { children: React.ReactNode }) {
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(mockChannels[0]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<TransmissionLog[]>(mockTransmissionLogs);
  const [incomingTransmission, setIncomingTransmission] = useState<TransmissionLog | null>(null);
  const [settings, setSettings] = useState<RadioSettings>({
    callSign: 'Officer Smith',
    unitId: 'PATROL-35',
    voiceActivation: false,
    transmissionBeep: true,
    backgroundMode: true,
    darkMode: true,
    hapticFeedback: true,
  });

  // Simulate incoming transmissions
  useEffect(() => {
    // Only simulate transmissions when we have an active channel
    if (!activeChannel) return;

    const randomTime = Math.floor(Math.random() * 20000) + 10000; // 10-30 seconds
    
    const transmissionTimeout = setTimeout(() => {
      // Create a random transmission
      const sender = `Unit-${Math.floor(Math.random() * 50) + 1}`;
      const isEmergency = Math.random() < 0.1; // 10% chance of emergency
      
      const randomMessages = [
        "10-4, copy that.",
        "I'm at the scene, need backup.",
        "Suspect in custody, area secure.",
        "Traffic stop in progress.",
        "Requesting additional units.",
        "Vehicle description: blue sedan, license plate ABC-123.",
        "Be advised, road closure on Main Street.",
        "10-20 please? I'm heading to your location.",
        "All units be advised, shift change in 30 minutes.",
        "Dispatch, I need a case number."
      ];
      
      const emergencyMessages = [
        "Officer down! Need immediate assistance!",
        "Shots fired! I repeat, shots fired!",
        "Need immediate backup! Suspect armed and dangerous!",
        "Officer in pursuit! Need assistance!",
        "Code 3 response needed immediately!"
      ];
      
      const newTransmission: TransmissionLog = {
        id: Date.now(),
        sender,
        channel: activeChannel.name,
        timestamp: new Date().toISOString(),
        message: isEmergency 
          ? emergencyMessages[Math.floor(Math.random() * emergencyMessages.length)] 
          : randomMessages[Math.floor(Math.random() * randomMessages.length)],
        type: 'incoming',
        isEmergency,
      };
      
      // Add to logs
      setTransmissionLogs(prev => [newTransmission, ...prev]);
      
      // Show overlay notification
      setIncomingTransmission(newTransmission);
      
      // Clear the notification after 5 seconds
      setTimeout(() => {
        setIncomingTransmission(null);
      }, 5000);
      
    }, randomTime);
    
    return () => clearTimeout(transmissionTimeout);
  }, [activeChannel, transmissionLogs]);

  const startTransmission = () => {
    if (!activeChannel) return;
    
    setIsTransmitting(true);
    
    // Play beep sound if enabled
    if (settings.transmissionBeep) {
      // Play sound logic here
      // This would typically use a sound library
    }
  };

  const endTransmission = () => {
    if (!isTransmitting || !activeChannel) return;
    
    setIsTransmitting(false);
    
    // Create transmission log entry
    const newTransmission: TransmissionLog = {
      id: Date.now(),
      sender: settings.unitId,
      channel: activeChannel.name,
      timestamp: new Date().toISOString(),
      message: "Transmission completed", // In a real app, this would be the recorded audio
      type: 'outgoing',
      isEmergency: false,
    };
    
    setTransmissionLogs(prev => [newTransmission, ...prev]);
    
    // Play end beep if enabled
    if (settings.transmissionBeep) {
      // Play sound logic here
    }
  };

  const sendEmergencyAlert = () => {
    if (!activeChannel) return;
    
    // Create emergency transmission
    const emergencyTransmission: TransmissionLog = {
      id: Date.now(),
      sender: settings.unitId,
      channel: activeChannel.name,
      timestamp: new Date().toISOString(),
      message: "EMERGENCY: Officer requesting immediate assistance!",
      type: 'outgoing',
      isEmergency: true,
    };
    
    setTransmissionLogs(prev => [emergencyTransmission, ...prev]);
    
    // In a real app, this would send the alert to all connected units
    // For now, we'll just add it to the logs
  };

  const updateSettings = (newSettings: RadioSettings) => {
    setSettings(newSettings);
  };

  const value = {
    channels,
    activeChannel,
    setActiveChannel,
    isTransmitting,
    startTransmission,
    endTransmission,
    sendEmergencyAlert,
    transmissionLogs,
    incomingTransmission,
    settings,
    updateSettings,
  };

  return React.createElement(RadioContext.Provider, { value }, children);
}

// Hook for using the context
export function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
}