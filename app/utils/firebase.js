import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGN66pkG9OqqikmDrcdXpV2x-S1mZShsc",
    authDomain: "vecinovigilante-e9d4e.firebaseapp.com",
    projectId: "vecinovigilante-e9d4e",
    storageBucket: "vecinovigilante-e9d4e.appspot.com",
    messagingSenderId: "407762202555",
    appId: "1:407762202555:web:c90d5818c26131684d1e9e"
  };

  //Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);