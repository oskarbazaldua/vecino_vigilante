import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import firebase from 'firebase/compat/app';


export default function Logged(){
    return(
        <View style={styles.container}>
            <Text>Logged!!</Text>
            <Button
            title="Cerrar Sesión"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={()=>firebase.auth().signOut()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginTop:20,
        width:"100%",
    },
    btn:{
        backgroundColor:"#0A6ED3",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})