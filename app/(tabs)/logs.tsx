import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRadio } from '@/hooks/useRadio';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { Filter, ArrowDown, ArrowUp } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function LogsScreen() {
  const { transmissionLogs } = useRadio();
  const [sortDescending, setSortDescending] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const sortedLogs = [...transmissionLogs].sort((a, b) => {
    if (sortDescending) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });

  const filteredLogs = sortedLogs.filter(log => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'incoming') return log.type === 'incoming';
    if (activeFilter === 'outgoing') return log.type === 'outgoing';
    if (activeFilter === 'emergency') return log.isEmergency;
    return true;
  });

  const renderLogItem = ({ item }) => {
    return (
      <View style={[
        styles.logItem, 
        item.isEmergency && styles.emergencyLog,
        item.type === 'incoming' ? styles.incomingLog : styles.outgoingLog
      ]}>
        <View style={styles.logHeader}>
          <Text style={styles.logSender}>{item.sender}</Text>
          <Text style={styles.logTime}>{formatDistanceToNow(item.timestamp)}</Text>
        </View>
        
        <Text style={styles.logMessage}>{item.message}</Text>
        
        <View style={styles.logFooter}>
          <Text style={styles.logChannel}>{item.channel}</Text>
          <Text style={styles.logType}>
            {item.isEmergency ? 'EMERGENCY' : item.type.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  };

  const renderFilterOptions = () => {
    if (!filterVisible) return null;
    
    const options = [
      { id: 'all', label: 'All Transmissions' },
      { id: 'incoming', label: 'Incoming Only' },
      { id: 'outgoing', label: 'Outgoing Only' },
      { id: 'emergency', label: 'Emergency Only' },
    ];
    
    return (
      <View style={styles.filterOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.filterOption,
              activeFilter === option.id && styles.activeFilterOption
            ]}
            onPress={() => {
              setActiveFilter(option.id);
              setFilterVisible(false);
            }}
          >
            <Text style={[
              styles.filterOptionText,
              activeFilter === option.id && styles.activeFilterOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Filter size={20} color={Colors.dark.text} />
          <Text style={styles.controlText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setSortDescending(!sortDescending)}
        >
          {sortDescending ? (
            <ArrowDown size={20} color={Colors.dark.text} />
          ) : (
            <ArrowUp size={20} color={Colors.dark.text} />
          )}
          <Text style={styles.controlText}>
            {sortDescending ? 'Newest First' : 'Oldest First'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderFilterOptions()}
      
      <FlatList
        data={filteredLogs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transmission logs available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  controlText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
  filterOptions: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  activeFilterOption: {
    backgroundColor: Colors.dark.tint + '20',
  },
  filterOptionText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  activeFilterOptionText: {
    fontWeight: '600',
    color: Colors.dark.tint,
  },
  listContent: {
    paddingBottom: 24,
  },
  logItem: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  emergencyLog: {
    borderLeftWidth: 4,
    borderLeftColor: '#D62828',
  },
  incomingLog: {
    borderLeftWidth: 2,
    borderLeftColor: '#06D6A0',
  },
  outgoingLog: {
    borderLeftWidth: 2,
    borderLeftColor: '#3B82F6',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logSender: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  logTime: {
    fontSize: 14,
    color: Colors.dark.mutedText,
  },
  logMessage: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logChannel: {
    fontSize: 14,
    color: Colors.dark.highlightText,
  },
  logType: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark.mutedText,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.dark.mutedText,
    marginTop: 32,
    fontSize: 16,
  },
});