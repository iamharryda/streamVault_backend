import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Confirmation = () => {
  return (
    <Modal transparent visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.message}>
              Your review has been published
            </Text>
          </View>

            <View style={styles.divider} />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.Button}>
                <Text style={styles.Text}>OK</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 361,
    height: 182,
    backgroundColor: '#0D282F',
    borderRadius: 12,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#E6E8E9',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  message: {
    color: '#B1B8B9',
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#36474B',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  Button: {
    backgroundColor: '#0D282F',
    width: 361,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: '#FACC15',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
