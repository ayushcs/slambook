
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCkMmita4JGg_JZ09HvMCtZ8-IZipQYflY",
    authDomain: "slambook-c99f8.firebaseapp.com",
    databaseURL: "https://slambook-c99f8-default-rtdb.firebaseio.com",
    projectId: "slambook-c99f8",
    storageBucket: "slambook-c99f8.appspot.com",
    messagingSenderId: "311202632890",
    appId: "1:311202632890:web:f88386718f1684650e9e83",
    measurementId: "G-RT8DZPC1ZE"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;