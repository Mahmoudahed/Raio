import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRadio } from '@/hooks/useRadio';
import { Lock, Radio, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChannelDetails } from '@/components/ChannelDetails';

export default function ChannelsScreen() {
  const { channels, activeChannel, setActiveChannel } = useRadio();
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelPress = (channel) => {
    setSelectedChannel(channel);
  };

  const handleChannelSelect = () => {
    if (selectedChannel) {
      setActiveChannel(selectedChannel);
      setSelectedChannel(null);
    }
  };

  const handleCloseDetails = () => {
    setSelectedChannel(null);
  };

  const renderChannelItem = ({ item }) => {
    const isActive = activeChannel?.id === item.id;
    
    return (
      <TouchableOpacity 
        style={[
          styles.channelItem,
          isActive && styles.activeChannel,
        ]}
        onPress={() => handleChannelPress(item)}
      >
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>{item.name}</Text>
          <Text style={styles.channelFreq}>{item.frequency} MHz</Text>
          <Text style={styles.channelDesc}>{item.description}</Text>
        </View>
        <View style={styles.channelMeta}>
          {item.encrypted && <Lock size={16} color={Colors.dark.mutedText} />}
          {item.favorite && <Star size={16} color="#FFD166" />}
          {isActive && <Radio size={20} color="#06D6A0" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {selectedChannel ? (
        <ChannelDetails 
          channel={selectedChannel} 
          onSelect={handleChannelSelect}
          onClose={handleCloseDetails}
        />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Available Channels</Text>
          <FlatList
            data={channels}
            renderItem={renderChannelItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  channelItem: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeChannel: {
    borderLeftWidth: 4,
    borderLeftColor: '#06D6A0',
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  channelFreq: {
    fontSize: 14,
    color: Colors.dark.highlightText,
    marginBottom: 8,
  },
  channelDesc: {
    fontSize: 14,
    color: Colors.dark.mutedText,
  },
  channelMeta: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingLeft: 12,
  },
});