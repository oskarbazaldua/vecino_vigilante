import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';


const handleCallPress = () => {
  Linking.openURL(`tel:${911}`);
};

export default function Accesos() {
  return (
    <TouchableOpacity style={styles.button} onPress={handleCallPress}>
      <Text style={styles.text}>Llamar al 911</Text>
      <Text style={styles.icon}>{Platform.OS === 'ios' ? '' : '☎'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  icon: {
    color: 'white',
    fontSize: 72,
    marginTop: 16,
  },
});
