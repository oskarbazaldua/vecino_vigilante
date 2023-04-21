import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';

const handleCallPress = () => {
    Linking.openURL(`tel:${911}`);
  };  

export default function Accesos() {
return (
<View style={styles.container}>
<Text style={styles.titleBnt}>Por favor presiona {"\n"} en caso de sentirte en peligro</Text>
<TouchableOpacity style={styles.button} onPress={handleCallPress}>
<Text style={styles.icon}>{Platform.OS === 'ios' ? '☏' : '☎'}</Text>
</TouchableOpacity>
<Text style={styles.titleCall}>Marcar al 911</Text>
</View>
);
};

const styles = StyleSheet.create({
icon: {
color: 'white',
fontSize: 72,
marginTop: 16,
},
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#fff',
},
titleBnt: {
fontSize: 24,
marginBottom: 40,
textAlign:'center',
},
titleCall: {
fontSize: 24,
marginTop: 40,
textAlign:'center',
},
button: {
width: 240,
height: 240,
backgroundColor: '#ff4d4d',
borderRadius: 120,
justifyContent: 'center',
alignItems: 'center',
borderWidth: 8,
borderColor: '#b30000',
},
buttonText: {    
justifyContent: 'center',
color: '#fff',
fontWeight: 'bold',
fontSize: 28,
},
});