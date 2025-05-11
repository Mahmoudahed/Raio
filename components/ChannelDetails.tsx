import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Lock, Users, Radio, Star, Key } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useRadio } from '@/hooks/useRadio';

type ChannelDetailsProps = {
  channel: any;
  onSelect: () => void;
  onClose: () => void;
};

export function ChannelDetails({ channel, onSelect, onClose }: ChannelDetailsProps) {
  const { activeChannel } = useRadio();
  const isActive = activeChannel?.id === channel.id;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleChannelSelect = () => {
    if (channel.password) {
      if (password === channel.password) {
        onSelect();
      } else {
        setError('Incorrect password');
      }
    } else {
      onSelect();
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <ArrowLeft size={20} color={Colors.dark.text} />
        <Text style={styles.backText}>Back to channels</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.name}>{channel.name}</Text>
        <Text style={styles.frequency}>{channel.frequency} MHz</Text>
        
        <View style={styles.badges}>
          {channel.encrypted && (
            <View style={styles.badge}>
              <Lock size={14} color="#fff" />
              <Text style={styles.badgeText}>Encrypted</Text>
            </View>
          )}
          {channel.password && (
            <View style={[styles.badge, { backgroundColor: '#3B82F6' }]}>
              <Key size={14} color="#fff" />
              <Text style={styles.badgeText}>Password Protected</Text>
            </View>
          )}
          {channel.primary && (
            <View style={[styles.badge, { backgroundColor: '#06D6A0' }]}>
              <Radio size={14} color="#fff" />
              <Text style={styles.badgeText}>Primary</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{channel.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Mode</Text>
          <Text style={styles.detailValue}>{channel.mode}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Region</Text>
          <Text style={styles.detailValue}>{channel.region}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Priority</Text>
          <Text style={styles.detailValue}>{channel.priority}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <View style={styles.statusBadge}>
            <View 
              style={[
                styles.statusDot, 
                { backgroundColor: channel.active ? '#06D6A0' : '#D62828' }
              ]} 
            />
            <Text style={styles.statusText}>
              {channel.active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Units</Text>
        <View style={styles.usersContainer}>
          <Users size={20} color={Colors.dark.mutedText} />
          <Text style={styles.userCount}>{channel.activeUsers} Units Online</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        {isActive ? (
          <View style={styles.activeButton}>
            <Radio size={20} color="#fff" />
            <Text style={styles.activeButtonText}>Current Channel</Text>
          </View>
        ) : (
          <>
            {channel.password && (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter channel password"
                  placeholderTextColor={Colors.dark.mutedText}
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>
            )}
            <TouchableOpacity 
              style={styles.selectButton} 
              onPress={handleChannelSelect}
            >
              <Radio size={20} color="#fff" />
              <Text style={styles.selectButtonText}>Switch to Channel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  frequency: {
    fontSize: 18,
    color: Colors.dark.highlightText,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D62828',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.text,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.dark.mutedText,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userCount: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  actions: {
    marginBottom: 40,
  },
  passwordContainer: {
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#D62828',
    fontSize: 14,
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  activeButton: {
    backgroundColor: '#06D6A0',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  activeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});