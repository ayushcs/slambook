
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCGp5A7LVnIlfxotWHR5Cd3pmG8THvPtDY",
    authDomain: "slambook-a6cf8.firebaseapp.com",
    databaseURL: "https://slambook-a6cf8-default-rtdb.firebaseio.com",
    projectId: "slambook-a6cf8",
    storageBucket: "slambook-a6cf8.appspot.com",
    messagingSenderId: "877474788842",
    appId: "1:877474788842:web:d67e3d7dfabfbe43602e93",
    measurementId: "G-Z0QVRBH4BD"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;