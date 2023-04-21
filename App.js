import React, {useEffect} from 'react';
//Importamos la estructura de nagación creada
import Navegacion from './app/navigations/Navegacion';

import { firebaseApp } from './app/utils/firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function App(){

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
    })
  },[]);
return <Navegacion/>
}

