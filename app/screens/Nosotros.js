import React, { useEffect, useState } from "react";
import { Header } from 'react-native-elements';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Linking } from "react-native";

//conección a la base de dato firebase para identificar al usuario registrado
import {firebaseApp} from "../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);
import "firebase/compat/auth";
const auth = firebase.auth();


const { width } = Dimensions.get("window");
const WidthScreen = Dimensions.get("window").width;



export default function Nosotros() {

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
  

  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return unsubscribe;
}, []);

/*split() divide una cadena en un array de subcadenas en función de un delimitador. 
En este caso, el delimitador sería el símbolo "@" y se puede utilizar el índice 0 del array 
resultante para obtener la parte del correo electrónico antes del símbolo "@".*/
const username = user ? user.email.split("@")[0] : "";
const greeting = user ? `Ingresaste como ${role}` : "Bienvenido";

  const images = [
    {
      id: "1",
      title: "Jonathan Moreno Espinoza",
      description: "Scrum Master",
      image: require("../../assets/img/1.png"),
    },
    {
      id: "2",
      title: "Oskar Bazaldúa Alejandre",
      description: "Dearrollador Web",
      image: require("../../assets/img/2.png"),
    },
    {
      id: "3",
      title: "Alexis Duarte Ceja",
      description: "Programador Front-End",
      image: require("../../assets/img/3.png"),
    },
    {
      id: "4",
      title: "Alexander Hueramo Fulgencio",
      description: "Diseñador Gráfico",
      image: require("../../assets/img/4.png"),
    },
    {
      id: "5",
      title: "Victor Hugo Uribe Ochoa",
      description: "Analista de Base de Datos",
      image: require("../../assets/img/5.png"),
    },
  ];

  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={stylesImg.item} onPress={() => { 
        alert(`¡Hola! Soy ${item.title} y estoy aquí para ayudarte.`) 
    }}>
        <Image source={item.image} style={stylesImg.itemImage} resizeMode="contain" />
        <View style={stylesImg.itemTextContainer}>
            <Text style={stylesImg.itemTitle}>{item.title}</Text>
            <Text style={stylesImg.itemDescription}>{item.description}</Text>
        </View>
    </TouchableOpacity>
);

  return (
    
    
  <ScrollView>
    <View centerContent={true} style={stylesImg.body}>
      <Header
        centerComponent={{ text: greeting, style: { flex: 1, color: '#fff', fontSize: 18 } }}
        containerStyle={{ backgroundColor:"#0A6ED3"}}/>
      <View style={styles.container}>
        <Banner/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Introducción</Text>
          <Text style={styles.introText}>
            Este prototipo de app web es creada para los residentes del fraccionamiento Diego Rivera 
            en Morelia Mich. localizado entre el mercado de abastos y la escuela secundaría #65, sobre 
            el periférico. {'\n'}
            {'\n'}Nosotros detectamos una necesidad en la administración del fraccionamiento acerca del registro 
            del pago de mantenimiento de los residentes.
          </Text>
          <Text style={styles.title}>Nosotros</Text>
        </View>
        <View style={stylesImg.listContainer}>
            <FlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={stylesImg.list}
              numColumns={2}
              justifyContent="center"/>
        </View>  
        <View>
          <Text style={styles.title}>Ubicación</Text>
        </View>
        <TouchableOpacity onPress={redireccion}>
          <ImgUbi/>   
        </TouchableOpacity>     
      </View>
    </View>
  </ScrollView>
  );
}

const redireccion = () => {
  Linking.openURL("https://tinyurl.com/2jjqxcqs");
}


const Banner = () => {
  return (
    <Image
      source={require("../../assets/img/logo.png")}
      style={styles.banner}
      resizeMode="cover"
    />
     );
};

const ImgUbi = () => {
  return (
    <Image
      source={require("../../assets/img/ubicacion.png")}
      style={{width:WidthScreen, height:350, marginTop:20}}
      resizeMode="cover"
    />
     );
};

//estilos del arreglo de imagenes en FlatList
const stylesImg = StyleSheet.create({
    //Define un estilo para el contenedor principal de la pantalla. 
    //El valor flex: 1 para que el contenedor ocupe todo el espacio disponible en la pantalla.
    body: {
        flex: 1,
      },
    //Define un estilo para cada elemento de la lista
    item: {
        //para que el elemento ocupe todo el ancho disponible en la pantalla
        flex: 1,
        //un margen de 10 píxeles alrededor
        margin: 10,
        //alinea el contenido al centro
        alignItems: "center",
      },
      //Define un estilo para la imagen de cada elemento de la lista.
    itemImage: {
        //El estilo asigna un ancho y un alto de width 2.5
        //que es la mitad del ancho de la pantalla dividido por 2.5
        width: width / 2.5,
        height: width / 2.5,
        //borde redondeado
        borderRadius: 20,
      },
    //Define un estilo para el contenedor del texto de cada elemento de la lista.
    itemTextContainer: {
        // El estilo asigna un margen superior de 5 píxeles
        marginTop: 5,
        //alinea el contenido al centro
        alignItems: "center",
      },
      //Define un estilo para el título de cada elemento de la lista
    itemTitle: {
        //asigna un tamaño de fuente de 16 píxeles
        fontSize: 16,
        fontWeight: "bold",
        //alinea el texto al centro
        textAlign: "center",
        //añade un margen inferior de 5 píxeles.
        marginBottom: 5,
      },
      //Define un estilo para la descripción de cada elemento de la lista
    itemDescription: {
        //El estilo asigna un tamaño de fuente de 14 píxeles
        fontSize: 14,
        //alinea el texto al centro 
        textAlign: "center",
      },
      //Define un estilo para el contenedor de la lista
    listContainer: {
        width: "100%",
        paddingHorizontal: 10,
      },
      //Define un estilo para la lista en sí misma
    list: {
        //asigna un valor de flex para que ocupe todo el espacio disponible en el contenedor.
        flex: 1,
      },

})



//estilos de otros elementos y banner
const styles = StyleSheet.create({
    imgUbicacion: {
      width:500,
      height:200,
      marginTop:20,
      
    },
    titleContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    title: {
        marginTop:20,
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 8,
    },
    container: {
        flex: 1,
        alignItems: "center",
      },
    banner: {
        width:200,
        height:200,
        marginTop:20,
    },
    introText: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24,
        textAlign: 'justify',
        paddingLeft:10,
        paddingRight:10,
    },
  });