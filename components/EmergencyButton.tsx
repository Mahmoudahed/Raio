import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  Animated, 
  Platform 
} from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useRadio } from '@/hooks/useRadio';

export function EmergencyButton() {
  const { sendEmergencyAlert } = useRadio();
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [confirmingEmergency, setConfirmingEmergency] = useState(false);
  
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  
  const handleEmergencyPress = () => {
    setModalVisible(true);
  };
  
  const handleCancel = () => {
    setModalVisible(false);
    setConfirmingEmergency(false);
    setCountdown(3);
  };
  
  const handleConfirm = () => {
    setConfirmingEmergency(true);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        const newCount = prev - 1;
        
        if (newCount <= 0) {
          clearInterval(countdownInterval);
          sendEmergencyAlert();
          setModalVisible(false);
          setConfirmingEmergency(false);
          setCountdown(3);
        }
        
        return newCount;
      });
    }, 1000);
    
    // Flash animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleEmergencyPress}
        activeOpacity={0.8}
      >
        <AlertTriangle size={28} color="#D62828" />
      </TouchableOpacity>
      <Text style={styles.label}>EMERGENCY</Text>
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              confirmingEmergency && { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.modalTitle}>
              {confirmingEmergency 
                ? `EMERGENCY ALERT IN ${countdown}` 
                : 'CONFIRM EMERGENCY'}
            </Text>
            
            {!confirmingEmergency ? (
              <>
                <Text style={styles.modalDescription}>
                  This will send an emergency alert to all units on your current channel.
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={handleConfirm}
                  >
                    <Text style={styles.confirmButtonText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>ABORT</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2C0B0B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D62828',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#D62828',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2C0B0B',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#D62828',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D62828',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#D62828',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});