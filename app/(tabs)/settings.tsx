import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ChevronRight, Save } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useRadio } from '@/hooks/useRadio';

export default function SettingsScreen() {
  const { settings, updateSettings } = useRadio();
  const [callSign, setCallSign] = useState(settings.callSign);
  const [unitId, setUnitId] = useState(settings.unitId);
  
  const handleSaveIdentity = () => {
    updateSettings({
      ...settings,
      callSign,
      unitId
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identity</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Call Sign</Text>
          <TextInput
            style={styles.input}
            value={callSign}
            onChangeText={setCallSign}
            placeholderTextColor={Colors.dark.mutedText}
            placeholder="Enter call sign"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Unit ID</Text>
          <TextInput
            style={styles.input}
            value={unitId}
            onChangeText={setUnitId}
            placeholderTextColor={Colors.dark.mutedText}
            placeholder="Enter unit ID"
          />
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveIdentity}>
          <Save size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Identity</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Communication</Text>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Voice Activation</Text>
            <Text style={styles.settingDescription}>Use voice to activate transmission</Text>
          </View>
          <Switch
            value={settings.voiceActivation}
            onValueChange={(value) => updateSettings({ ...settings, voiceActivation: value })}
            trackColor={{ false: '#767577', true: Colors.dark.tint + '80' }}
            thumbColor={settings.voiceActivation ? Colors.dark.tint : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Transmission Beep</Text>
            <Text style={styles.settingDescription}>Play beep sound when transmission starts/ends</Text>
          </View>
          <Switch
            value={settings.transmissionBeep}
            onValueChange={(value) => updateSettings({ ...settings, transmissionBeep: value })}
            trackColor={{ false: '#767577', true: Colors.dark.tint + '80' }}
            thumbColor={settings.transmissionBeep ? Colors.dark.tint : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Background Mode</Text>
            <Text style={styles.settingDescription}>Keep radio active when app is in background</Text>
          </View>
          <Switch
            value={settings.backgroundMode}
            onValueChange={(value) => updateSettings({ ...settings, backgroundMode: value })}
            trackColor={{ false: '#767577', true: Colors.dark.tint + '80' }}
            thumbColor={settings.backgroundMode ? Colors.dark.tint : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interface</Text>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark color scheme</Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => updateSettings({ ...settings, darkMode: value })}
            trackColor={{ false: '#767577', true: Colors.dark.tint + '80' }}
            thumbColor={settings.darkMode ? Colors.dark.tint : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Haptic Feedback</Text>
            <Text style={styles.settingDescription}>Use vibration for button presses</Text>
          </View>
          <Switch
            value={settings.hapticFeedback}
            onValueChange={(value) => updateSettings({ ...settings, hapticFeedback: value })}
            trackColor={{ false: '#767577', true: Colors.dark.tint + '80' }}
            thumbColor={settings.hapticFeedback ? Colors.dark.tint : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced</Text>
        <TouchableOpacity style={styles.linkItem}>
          <View>
            <Text style={styles.linkTitle}>Encryption Settings</Text>
            <Text style={styles.linkDescription}>Configure transmission encryption</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.mutedText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.linkItem}>
          <View>
            <Text style={styles.linkTitle}>Network Configuration</Text>
            <Text style={styles.linkDescription}>Configure connection settings</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.mutedText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.linkItem}>
          <View>
            <Text style={styles.linkTitle}>Audio Settings</Text>
            <Text style={styles.linkDescription}>Configure microphone and speaker</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.mutedText} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.version}>Police Radio v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.dark.mutedText,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  linkDescription: {
    fontSize: 14,
    color: Colors.dark.mutedText,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: Colors.dark.mutedText,
    marginTop: 16,
    fontSize: 14,
  },
});