import React, {useState, useEffect} from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
//Importamos la libreria de react-native-elements para dar estilo al menú
import { Icon } from "react-native-elements";

//conección a la base de dato firebase para identificar al usuario registrado
import {firebaseApp} from "../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

//importa Header es utilizado para mostrar un mensaje de bienvenida 
//personalizado para el usuario actualmente registrado.

//se importan las páginas que se usarán en la nevagaciónn
import Nosotros from "../screens/Nosotros";
import RutasComentarios from "./RutasComentarios";
import RutasCuentas from "./RutasCuentas";
import Accesos from "../screens/Accesos";
import "firebase/compat/auth";

const Tab = createBottomTabNavigator();

const auth = firebase.auth();

export default function Navegacion(){

    const [role, setRole] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("usuarios")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              setRole(data.role);
            }
          })
          .catch((error) => {
            console.log("Error al obtener el documento:", error);
          });
      } else {
        setRole("");
      }
    });

    return unsubscribe;
  }, []);

  // Imprime el valor de role en la consola
  console.log("Rol actual:", role); 

    return(
    
        <NavigationContainer style={styles.fondo}>
            <Tab.Navigator
                //Define en que página se desea iniciar
                initialRouteName="nosotros" //nombre denifido en el Tab.Screen 'name'
                tabBarStyle={
                    {
                        //Color del texto e ícono cuano no esta activo
                        tabBarInactiveTintColor:"#52585E",
                        //Color del texto e ícono cuando está activo
                        tabBarActiveTintColor:"#00a680",
                    }
                }
                //Para cada ruta cargada en el proyecto entonces =>
                screenOptions={({route})=>({
                    /*Se asigna el color de la ruta al ícono y se ejecuta la función
                    opciones que recibe la ruta del menú y color*/
                    tabBarIcon:({color})=> opciones(route,color),
                })}
            >
                {/*Muestra un boton que se vincula a
                nuetro componente importado*/}
                <Tab.Screen 
                    name="nosotros" 
                    component={Nosotros} 
                    options={{
                        title:"Principal"}}
                        />
                
                <Tab.Screen 
                    name="Comentarios"
                    component={RutasComentarios} 
                    options={{headerShown: false}} 
                    />
                <Tab.Screen 
                    name="Accesos" 
                    component={Accesos} 
                    options={{
                        title:"Pánico"}}
                        />        
                <Tab.Screen 
                    name="Cuentas" 
                    component={RutasCuentas} 
                    options={{
                        headerShown: false}}
                        />
            </Tab.Navigator>
        </NavigationContainer>
   
    )
}

function opciones(ruta,color){
    let iconName;
    switch(ruta.name){

        case "nosotros":
            iconName="home";
            break;
        case "Comentarios":
            iconName="edit";
            break;
        case "Accesos":
            iconName="shield";
            break;
        case "Cuentas":
            iconName="person";
            break;
        default:
            break;
    }
    return(
        
        <Icon type="material-comunity" name={iconName} size={22} color={color}/>
    )
}

const styles = StyleSheet.create({
    fondo:{
        flex: 1, 
        backgroundColor: "#8e44ad",
    }
})